import { FunctionComponent, useContext } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useSnackbar } from 'notistack'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

import { auth, db } from '../../../firebase/config'
import { AuthContext } from '../../AuthContext'
import { RegisterInput } from '../../../types/typesForms'

import FormRegister from './FormRegister'

interface Props {
    handleClose: () => void,
    handleToggle: () => void,
}

const FormikRegister: FunctionComponent<Props> = ({ handleClose, handleToggle }) => {
    const { enqueueSnackbar } = useSnackbar()

    const {
        setIsAuthenticated, setIsLoading,
    } = useContext(AuthContext)

    const onFormikSubmit = (
        values: RegisterInput,
        formikActions: FormikHelpers<RegisterInput>
    ) => {
        handleToggle()
        setIsLoading(true)

        return createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(async (response) => {
                console.log(response)
                formikActions.setStatus(1)
                formikActions.resetForm()
                setIsAuthenticated(true)
                enqueueSnackbar('Autenticado com sucesso.', {
                    variant: 'success',
                })

                await setDoc(doc(db, 'users', response.user.uid), {
                    fullName: values.fullName,
                    email: values.email,
                    userId: response.user.uid
                })
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log({ errorCode, errorMessage })
                enqueueSnackbar(errorMessage, {
                    variant: 'error',
                })
            })
            .finally(() => {
                handleClose()
                formikActions.setSubmitting(false)
                setIsLoading(false)
            })
    }

    return (
        <Formik<RegisterInput>
            onSubmit={onFormikSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize
            initialStatus={0}
            initialValues={{
                fullName: '',
                email: '',
                password: '',
            }}
        >
            {({ status }) => (
                <Form key={status}>
                    <FormRegister />
                </Form>
            )}
        </Formik>
    )
}
export default FormikRegister
