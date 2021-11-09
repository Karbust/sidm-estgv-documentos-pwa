import { FunctionComponent, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'

import { PrivateRouteProps } from '../types/typesAuthProvider'

import { AuthContext } from './AuthContext'

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
                            : <Redirect to='/Navigation' />
                    ) : <CircularProgress color='inherit' />
            )}
        />
    )
}
export default PrivateRoute
