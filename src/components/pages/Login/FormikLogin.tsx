import { FunctionComponent, useContext } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useSnackbar } from 'notistack'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { AuthContext } from '../../AuthContext'
import { LoginInput } from '../../../types/typesForms'
import { auth } from '../../../firebase/config'

import FormLogin from './FormLogin'

interface Props {
    handleClose: () => void,
    handleToggle: () => void,
}

const FormikLogin: FunctionComponent<Props> = ({ handleClose, handleToggle }) => {
    const { enqueueSnackbar } = useSnackbar()

    const {
        setIsAuthenticated, setIsLoading,
    } = useContext(AuthContext)

    const onFormikSubmit = (
        values: LoginInput,
        formikActions: FormikHelpers<LoginInput>
    ) => {
        handleToggle()
        setIsLoading(true)

        return signInWithEmailAndPassword(auth, values.email, values.password)
            .then((response) => {
                console.log(response)
                formikActions.setStatus(1)
                formikActions.resetForm()
                setIsAuthenticated(true)
                enqueueSnackbar('Autenticado com sucesso.', {
                    variant: 'success',
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
        <Formik<LoginInput>
            onSubmit={onFormikSubmit}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize
            initialStatus={0}
            initialValues={{
                email: '',
                password: '',
            }}
        >
            {({ status }) => (
                <Form key={status}>
                    <FormLogin />
                </Form>
            )}
        </Formik>
    )
}
export default FormikLogin
