import {
    createContext, FunctionComponent, useContext, useEffect, useState
} from 'react'
import { useSnackbar } from 'notistack'

import SnackbarCloseButton from '../components/SnackbarCloseButton'

const PING_RESOURCE = '/ping.txt'
const TIMEOUT_TIME_MS = 3000
const onlinePollingInterval = 5000

const timeout = (time: number, promise: Promise<any>) => new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('Request timed out.'))
    }, time)
    promise.then(resolve, reject)
})

const checkOnlineStatus = async () => {
    const controller = new AbortController()
    const { signal } = controller

    // If the browser has no network connection return offline
    if (!navigator.onLine) return navigator.onLine

    //
    try {
        await timeout(
            TIMEOUT_TIME_MS,
            fetch(PING_RESOURCE, {
                method: 'GET',
                signal
            })
        )
        return true
    } catch (error) {
        // Error Log
        console.error(error)

        // This can be because of request timed out
        // so we abort the request for any case
        controller.abort()
    }
    return false
}

const OnlineStatusContext = createContext(true)

export const OnlineStatusProvider: FunctionComponent = ({ children }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const [statusOnlineNotification, setStatusOnlineNotification] = useState<boolean>(true)

    const [onlineStatus, setOnlineStatus] = useState<boolean>(true)

    const checkStatus = async () => {
        const online = await checkOnlineStatus()
        setOnlineStatus(online)
        if (online) {
            closeSnackbar()
        }
    }

    useEffect(() => {
        if (onlineStatus && !statusOnlineNotification) {
            setStatusOnlineNotification(true)
            enqueueSnackbar('Back online.', {
                variant: 'success',
                autoHideDuration: 3000,
                preventDuplicate: true
            })
        }
    }, [onlineStatus, statusOnlineNotification])

    useEffect(() => {
        window.addEventListener('offline', () => {
            setOnlineStatus(false)
            setStatusOnlineNotification(false)
            enqueueSnackbar('No internet connection.', {
                variant: 'error',
                persist: true
            })
        })

        // Add polling incase of slow connection
        const id = setInterval(() => {
            checkStatus()
        }, onlinePollingInterval)

        return () => {
            window.removeEventListener('offline', () => {
                setOnlineStatus(false)
            })

            clearInterval(id)
        }
    }, [])

    return (
        <OnlineStatusContext.Provider value={onlineStatus}>
            {children}
        </OnlineStatusContext.Provider>
    )
}

export const useOnlineStatus = () => useContext(OnlineStatusContext)

export default useOnlineStatus
