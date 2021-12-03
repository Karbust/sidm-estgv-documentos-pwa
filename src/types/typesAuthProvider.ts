import { FunctionComponent, SetStateAction } from 'react'
import { RouteComponentProps, RouteProps } from 'react-router-dom'

export interface IContextProps {
    isLoading: boolean
    isAuthenticated: boolean
    setIsLoading: (value: SetStateAction<boolean>) => void
    setIsAuthenticated: (value: SetStateAction<boolean>) => void
    logout: () => Promise<void>
}

export interface AuthProps {
    children: any[] | any
}

export interface PrivateRouteProps extends RouteProps {
    component: FunctionComponent<RouteComponentProps<any>>
}
