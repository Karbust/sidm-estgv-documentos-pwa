import { FunctionComponent, useContext } from 'react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useSnackbar } from 'notistack'
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '../../../firebase/config'
import { AuthContext } from '../../AuthContext'
import { LoginInput } from '../../../types/typesForms'

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
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                signInWithEmailAndPassword(auth, values.email, values.password)
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
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code
                const errorMessage = error.message
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
