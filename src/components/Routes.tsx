import { FunctionComponent } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import RoutesList from './RoutesList'

const Routes: FunctionComponent = () => {
    const { path } = useRouteMatch()

    return (
        <Switch>
            <Route exact path='/Dashboard'>
                <Redirect push to='/Dashboard/Files' />
            </Route>
            <Route exact path={`${path}`}>
                <Redirect push to='/Dashboard/Files' />
            </Route>

            {
                RoutesList.map(((value, index) => (
                    <PrivateRoute
                        exact
                        key={index}
                        path={`${path}${value.url}`}
                        component={value.component}
                    />
                )))
            }

            {/*404 fallback no route matches*/}
            <Route exact path={`${path}*`}>
                <Redirect push to='/Dashboard' />
            </Route>
        </Switch>
    )
}
export default Routes
