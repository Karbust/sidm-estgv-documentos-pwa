import { Suspense } from 'react'
import ReactDOM from 'react-dom'
import Box from '@mui/system/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { SnackbarProvider } from 'notistack'
// @ts-ignore
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles'

import './index.css'

import App from './App'

export const primaryColor = '#2C343F'
export const secondaryColor = '#696969'

const theme = createTheme({
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
                    <Box className='outer'>
                        <Box className='middle'>
                            <Box className='inner'>
                                <section id='loading-screen'>
                                    <CircularProgress color='inherit' />
                                </section>
                            </Box>
                        </Box>
                    </Box>
                )}
            >
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                >
                    <App />
                </SnackbarProvider>
            </Suspense>
        </ThemeProvider>
    </StyledEngineProvider>,
    document.getElementById('root')
)
