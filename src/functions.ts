import { SetStateAction, useState } from 'react'
import { FullMetadata, getMetadata, listAll, ref } from 'firebase/storage'
import {
    collection, DocumentData, getDocs, query, where, getDoc, doc
} from 'firebase/firestore'
import queryString from 'query-string'

import IndexedDb from './indexedDb'
import { auth, db, storage } from './firebase/config'

export const MAIN_PATH = '/Dashboard'

export const useForceUpdate = (): () => void => {
    const [_, setValue] = useState(0) // integer state
    return () => setValue((oldValue) => oldValue + 1) // update the state to force render
}

export interface parsedType {
    folder?: string
}

export const getCurrentUser = async (isOnline: boolean): Promise<DocumentData | null> => {
    if (isOnline) {
        const docRef = doc(db, 'users', auth.currentUser?.uid ?? '')
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log('Document data:', docSnap.data())
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!')
        }

        localStorage.setItem('userData', JSON.stringify(docSnap.exists() ? docSnap.data() : ''))

        return docSnap.exists() ? docSnap.data() : null
    }

    const userData = localStorage.getItem('userData')
    if (userData && userData !== '') {
        return JSON.parse(userData)
    }

    return null
}

export const getCurrentFolder = (): string => {
    const parsed: parsedType = queryString.parse(window.location.search)
    return parsed.folder ? parsed.folder : ''
}

interface listAllFilesProps {
    setFolders: (value: SetStateAction<string[]>) => void
    setFiles: (value: SetStateAction<FullMetadata[] | null>) => void
    route?: string
}

export const listAllFiles = ({ setFolders, setFiles, route = '' }: listAllFilesProps) => {
    const storageRef = ref(storage, `uploads/${auth.currentUser?.uid}/${route}`)
    listAll(storageRef)
        .then(async (res) => {
            setFolders(res.prefixes.map((value) => value.name))

            const data = await Promise.all(res.items.map(async (value) => {
                const itemRef = ref(storage, value.fullPath)
                return getMetadata(itemRef)
            }))
            setFiles(data)
        })
        .catch(console.error)
}

export const getAllDocs = async () => {
    const q = query(collection(db, 'documents'), where('owner', '==', auth.currentUser?.uid))

    return getDocs(q)
}

export const parseFileExtensions = async (indexedDb: IndexedDb, document: DocumentData, fileExtensionsCount: Array<{extension: string, count: number, color: string}>) => {
    if (fileExtensionsCount.filter((e) => e.extension === document.extension).length === 0) {
        fileExtensionsCount.push({
            extension: document.extension,
            count: 0,
            color: `#${(0x1000000 + (Math.random() * 0xffffff)).toString(16).substr(1, 6)}`
        })
    }
    const valueReturn = fileExtensionsCount.map((value) => {
        if (value.extension === document.extension) {
            value.count++
        }
        return value
    })
    await indexedDb.deleteAllValue('statistics')
    await indexedDb.putValue('statistics', valueReturn)

    return valueReturn
}

export const humanFileSize = (bytes: number, si = false, dp = 1): string => {
    const thresh = si ? 1000 : 1024

    if (Math.abs(bytes) < thresh) {
        return `${bytes} B`
    }

    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    let u = -1
    const r = 10 ** dp

    do {
        bytes /= thresh
        ++u
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)

    return `${bytes.toFixed(dp)} ${units[u]}`
}
