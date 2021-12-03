import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ListItemButton from '@mui/material/ListItemButton'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { FullMetadata } from 'firebase/storage'
import { nanoid } from 'nanoid'
import { format } from 'date-fns'
import queryString from 'query-string'

import { humanFileSize, listAllFiles, MAIN_PATH, parsedType } from '../../functions'
import { Context } from '../../reducer/Store'
import { useOnlineStatus } from '../../lib/useOnlineStatus'

const Files: FunctionComponent = () => {
    // @ts-ignore
    const { state } = useContext(Context)

    const isOnline = useOnlineStatus()

    const parsed: parsedType = queryString.parse(window.location.search)

    const [folders, setFolders] = useState<string[]>([])
    const [files, setFiles] = useState<FullMetadata[] | null>(null)

    useEffect(() => {
        listAllFiles({ setFolders, setFiles, route: parsed.folder ?? '' })
    }, [parsed.folder, state.update, isOnline])

    return (
        <div style={{ paddingBottom: '56px' }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {folders.map((value) => (
                    <ListItem
                        key={nanoid()}
                        style={{ width: '100vw' }}
                        disablePadding
                    >
                        <ListItemButton component={Link} to={`${MAIN_PATH}/Files${value && `?folder=${value}`}`}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FolderOutlinedIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={value}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
                {files?.map((value) => (
                    <ListItem
                        key={nanoid()}
                        style={{ width: '100vw' }}
                        secondaryAction={(
                            <IconButton edge='end' aria-label='delete'>
                                <MoreVertIcon />
                            </IconButton>
                        )}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <InsertDriveFileOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={value.name}
                            secondary={`${humanFileSize(value.size, true)} - ${format(new Date(value.timeCreated), 'dd-MM-yyyy HH:mm:ss')}`}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}
export default Files
