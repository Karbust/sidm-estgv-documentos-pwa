import { createContext, FunctionComponent, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { onAuthStateChanged, signOut } from 'firebase/auth'

import { AuthProps, IContextProps } from '../types/typesAuthProvider'
import { auth } from '../firebase/config'

export const AuthContext = createContext({} as IContextProps)

const AuthContextProvider: FunctionComponent<AuthProps> = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        const user = auth.currentUser
        if (user) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }, [])

    const logout = (): void => {
        signOut(auth)
            .then(() => {
                setIsAuthenticated(false)
                enqueueSnackbar('Logout efetuado com sucesso.', {
                    variant: 'success',
                })
            })
            .catch((error) => {
                console.error(error)
                enqueueSnackbar('Não foi possível efetuar o logout.', {
                    variant: 'error',
                })
            })
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider
