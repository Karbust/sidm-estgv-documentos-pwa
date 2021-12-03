import { FunctionComponent, lazy, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Box from '@mui/material/Box'
import styled from '@emotion/styled'
import CircularProgress from '@mui/material/CircularProgress'

import Store from './reducer/Store'
import Routes from './components/Routes'
import { PrivateRouteProps } from './types/typesAuthProvider'
import AuthContextProvider, { AuthContext } from './components/AuthContext'

const Navigation = lazy(() => import('./components/pages/Navigation'))
const Login = lazy(() => import('./components/pages/Login/Login'))

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ component: Component, ...otherProps }) => {
    const { isLoading, isAuthenticated } = useContext(AuthContext)

    return (
        <Route
            {...otherProps}
            render={(props) => (
                !isLoading
                    ? (
                        isAuthenticated
                            ? <Component {...props} />
                            : <Redirect to='/Login' />
                    ) : (
                        <Box className='outer'>
                            <Box className='middle'>
                                <Box className='inner'>
                                    <CircularProgress color='inherit' />
                                </Box>
                            </Box>
                        </Box>
                    )
            )}
        />
    )
}

const Main = styled.main`
  @media (max-width: 960px) {
    padding: 60px 0 0 0;
  }
`

const MainComponent: FunctionComponent = () => (
    <div>
        <Main>
            <Navigation />
            <Routes />
        </Main>
    </div>
)

const App: FunctionComponent = () => (
    <AuthContextProvider>
        <Store>
            <Router>
                <Switch>
                    <Route path='/' exact>
                        <Redirect push to='/Dashboard' />
                    </Route>
                    <PrivateRoute path='/Dashboard' component={MainComponent} />
                    <Route path='/Login'>
                        <LoginPage />
                    </Route>
                    <PrivateRoute path='/Logout' component={Logout} />
                    <Route path='*' exact>
                        <Redirect to='/' />
                    </Route>
                </Switch>
            </Router>
        </Store>
    </AuthContextProvider>
)

const LoginPage = () => {
    const { isAuthenticated } = useContext(AuthContext)

    return isAuthenticated
        ? <Redirect to='/Dashboard' />
        : <Login />
}

const Logout = () => {
    const { logout } = useContext(AuthContext)

    logout()
    return <Redirect push to='/Login' />
}

export default App
