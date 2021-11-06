import { FunctionComponent, SetStateAction } from 'react'
import { RouteComponentProps, RouteProps } from 'react-router-dom'

export interface IContextProps {
    isAuthenticated: boolean
    setIsAuthenticated: (value: SetStateAction<boolean>) => void
    logout: () => void
}

export interface AuthProps {
    children: any[] | any
}

export interface PrivateRouteProps extends RouteProps {
    component: FunctionComponent<RouteComponentProps<any>>
    requiredPermissions?: any
}
