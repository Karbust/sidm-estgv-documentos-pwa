import { createContext, FunctionComponent, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useSnackbar } from 'notistack'

import { AuthProps, IContextProps } from '../types/typesAuthProvider'
import { auth } from '../firebase/config'

export const AuthContext = createContext({} as IContextProps)

const AuthContextProvider: FunctionComponent<AuthProps> = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        console.log('Estou aqui')
        onAuthStateChanged(auth, (user) => {
            console.log('Estou aqui 1')
            if (user) {
                console.log('We are authenticated now!')
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
            setIsLoading(false)
        })
    }, [])

    const logout = async (): Promise<void> => {
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
        <AuthContext.Provider value={{
            isLoading, isAuthenticated, setIsLoading, setIsAuthenticated, logout
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider
