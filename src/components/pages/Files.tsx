import {
    FunctionComponent, useContext, useEffect, useState
} from 'react'
import List from '@mui/material/List'
import { FullMetadata, StorageReference } from 'firebase/storage'
import { nanoid } from 'nanoid'
import queryString from 'query-string'

import ListItemFile from '../ListItemFile'
import { Context } from '../../reducer/Store'
import { useOnlineStatus } from '../../lib/useOnlineStatus'
import { listAllFiles, parsedType } from '../../functions'
import ListItemFolder from '../ListItemFolder'

const Files: FunctionComponent = () => {
    // @ts-ignore
    const { state } = useContext(Context)

    const isOnline = useOnlineStatus()

    const parsed: parsedType = queryString.parse(window.location.search)

    const [folders, setFolders] = useState<StorageReference[] | null>([])
    const [files, setFiles] = useState<FullMetadata[] | null>(null)

    useEffect(() => {
        listAllFiles({ setFolders, setFiles, route: parsed.folder ?? '' })
    }, [parsed.folder, state.update, isOnline])

    return (
        <div style={{ paddingBottom: '56px' }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {folders?.map((value) => (
                    <ListItemFolder key={nanoid()} value={value} />
                ))}
                {files?.map((value) => (
                    <ListItemFile key={nanoid()} value={value} />
                ))}
            </List>
        </div>
    )
}
export default Files
