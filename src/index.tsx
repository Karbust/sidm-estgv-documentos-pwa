import { Suspense } from 'react'
import ReactDOM from 'react-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { SnackbarProvider } from 'notistack'
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles'

import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorkerRegistration'
import { OnlineStatusProvider } from './lib/useOnlineStatus'
import Center from './components/Center'
import SnackbarCloseButton from './components/SnackbarCloseButton'

export const primaryColor = '#2C343F'
export const secondaryColor = '#696969'

const theme = createTheme({
    // @ts-ignore
    css: {
        primary: '#3f51b5',
        secondary: '#f50057'
    },
    palette: {
        primary: {
            main: primaryColor
        },
        secondary: {
            main: secondaryColor
        }
    }
})

ReactDOM.render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
            <Suspense
                fallback={(
                    <Center loading component={CircularProgress} />
                )}
            >
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    action={SnackbarCloseButton}
                >
                    <OnlineStatusProvider>
                        <App />
                    </OnlineStatusProvider>
                </SnackbarProvider>
            </Suspense>
        </ThemeProvider>
    </StyledEngineProvider>,
    document.getElementById('root')
)

serviceWorker.register()
