import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Field, FieldProps, useFormikContext } from 'formik'
import Box from '@mui/system/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

import { LoginInput } from '../../../types/typesForms'

const FormLogin: FunctionComponent = () => {
    const {
        isValid, isSubmitting, validateField
    } = useFormikContext<LoginInput>()

    return (
        <>
            <Field name='email'>
                {({ field, form: { errors } }: FieldProps<LoginInput>) => (
                    <TextField
                        {...field}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        autoFocus
                        label='Email'
                        inputProps={{
                            'aria-label': 'Email',
                            'minLength': 6
                        }}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        onBlur={(event: { currentTarget: { name: string } }) => validateField(event.currentTarget.name)}
                    />
                )}
            </Field>
            <Field name='password'>
                {({ field, form: { errors } }: FieldProps<LoginInput>) => (
                    <TextField
                        {...field}
                        required
                        fullWidth
                        variant='outlined'
                        margin='normal'
                        label='Password'
                        type='password'
                        inputProps={{
                            'aria-label': 'Password',
                            'minLength': 6,
                            'maxLength': 16,
                        }}
                        autoComplete='password'
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        onBlur={(event: { currentTarget: { name: string } }) => validateField(event.currentTarget.name)}
                    />
                )}
            </Field>
            <Box
                style={{
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                <Link
                    to='/Login'
                    style={{
                        textDecoration: 'none !important'
                    }}
                >
                    Don&apos;t have an account yet? Sign Up
                </Link>
            </Box>
            <Button
                fullWidth
                type='submit'
                variant='contained'
                color='primary'
                className='loginSubmit'
                disabled={!isValid || isSubmitting}
            >
                {isSubmitting && (
                    <CircularProgress
                        color='inherit'
                    />
                )}
                {!isSubmitting && 'Login'}
            </Button>
        </>
    )
}
export default FormLogin
