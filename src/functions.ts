import { SetStateAction, useState } from 'react'
import {
    deleteObject, FullMetadata, getMetadata, listAll, ref, StorageReference
} from 'firebase/storage'
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
    setFolders: (value: SetStateAction<StorageReference[] | null>) => void
    setFiles: (value: SetStateAction<FullMetadata[] | null>) => void
    route?: string
}

export const listAllFiles = ({ setFolders, setFiles, route = '' }: listAllFilesProps) => {
    const storageRef = ref(storage, `uploads/${auth.currentUser?.uid}/${route}`)
    listAll(storageRef)
        .then(async (res) => {
            setFolders(res.prefixes.map((value) => value))

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

export const _saveBlob = (response: any, fileName: string) => {
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.style = 'display: none'
    a.href = window.URL.createObjectURL(response)
    a.download = fileName
    a.click()
    document.body.removeChild(a)
}

export const errorDownloadUrlFirebase = (error: any) => {
    let reason: string
    switch (error.code) {
        case 'storage/object-not-found':
            reason = 'storage/object-not-found'
            console.log('storage/object-not-found')
            break

        case 'storage/unauthorized':
            reason = 'storage/unauthorized'
            console.log('storage/unauthorized')
            break

        case 'storage/canceled':
            reason = 'storage/canceled'
            console.log('storage/canceled')
            break

        case 'storage/unknown':
            reason = 'storage/unknown'
            console.log('storage/unknown')
            break

        default:
            reason = 'Unknown Error.'
            console.log('Unknown Error.')
            break
    }
    return reason
}

export const deleteFolderContents = (path: string, dispatch: any, state: any) => {
    const refFolder = ref(storage, path)
    return listAll(refFolder)
        .then((dir) => {
            dir.items.forEach(async (fileRef) => {
                await deleteObject(ref(storage, fileRef.fullPath))

                dispatch({
                    type: 'SET_UPDATE',
                    payload: state.update + 1
                })
            })
            dir.prefixes.forEach(async (folderRef) => {
                await deleteFolderContents(folderRef.fullPath, dispatch, state)
            })
        })
        .catch((error) => {
            console.log(error)
        })
}
