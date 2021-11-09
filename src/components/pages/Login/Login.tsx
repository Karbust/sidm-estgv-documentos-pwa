import { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import Backdrop from '@mui/material/Backdrop'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import CircularProgress from '@mui/material/CircularProgress'
import { faUserLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../../../css/login.css'

import FormikLogin from './FormikLogin'

const LoginPaper = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoginAvatar = styled(Avatar)`
  margin: 8px;
  background-color: ${({ theme }) =>
    // @ts-ignore
    // eslint-disable-next-line implicit-arrow-linebreak
        theme.css.secondary
};
`

const Login: FunctionComponent = () => {
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const handleToggle = () => setOpen(!open)

    return (
        <>
            <Backdrop className='loginBackdrop' open={open} onClick={handleClose}>
                <CircularProgress color='inherit' />
            </Backdrop>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <LoginPaper>
                    <LoginAvatar>
                        <FontAwesomeIcon icon={faUserLock} />
                    </LoginAvatar>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <FormikLogin
                        handleClose={handleClose}
                        handleToggle={handleToggle}
                    />
                </LoginPaper>
            </Container>
        </>
    )
}
export default Login
