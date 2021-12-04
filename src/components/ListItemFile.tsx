import { FunctionComponent, MouseEvent, useContext, useState } from 'react'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import Menu from '@mui/material/Menu'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { format } from 'date-fns'
import { useSnackbar } from 'notistack'
import { deleteObject, FullMetadata, getDownloadURL, ref } from 'firebase/storage'

import { humanFileSize, _saveBlob, errorDownloadUrlFirebase } from '../functions'
import { storage } from '../firebase/config'
import { Context } from '../reducer/Store'

import DialogFileDetails from './DialogFileDetails'

const DangerMenuItem = styled(MenuItem)`
    color: #fff;
    background-color: #f00;

    &:hover {
        color: #000;
    }
`

interface Props {
    value: FullMetadata
}

const ListItemFile: FunctionComponent<Props> = ({ value }) => {
    // @ts-ignore
    const { dispatch, state } = useContext(Context)

    const { enqueueSnackbar } = useSnackbar()

    const [open, setOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClickFile = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleCloseFile = () => setAnchorEl(null)

    const openDialog = () => setOpen(true)

    const deleteItem = () => {
        deleteObject(ref(storage, value.fullPath))
            .then(() => {
                dispatch({
                    type: 'SET_UPDATE',
                    payload: state.update + 1
                })
                enqueueSnackbar('File successfully deleted.', {
                    variant: 'success',
                })
            })
            .catch((error) => {
                const errorMessage = error.message
                enqueueSnackbar(errorMessage, {
                    variant: 'error',
                })
            })
    }

    const downloadItem = () => {
        getDownloadURL(ref(storage, value.fullPath))
            .then((url) => {
                const xhr = new XMLHttpRequest()
                xhr.responseType = 'blob'
                xhr.onload = () => {
                    const blob = xhr.response
                    _saveBlob(blob, value.name)
                }
                xhr.open('GET', url)
                xhr.send()
            }).catch((error) => {
                enqueueSnackbar(errorDownloadUrlFirebase(error), {
                    variant: 'error',
                })
            })
    }

    const copyItemUrl = () => {
        getDownloadURL(ref(storage, value.fullPath))
            .then(async (url) => {
                try {
                    await navigator.clipboard.writeText(url)
                    enqueueSnackbar('URL coppied to the clipboard.', {
                        variant: 'info',
                    })
                } catch (err) {
                    console.error(err)
                    enqueueSnackbar('Unknown error when copying the URL.', {
                        variant: 'error',
                    })
                }
            }).catch((error) => {
                enqueueSnackbar(errorDownloadUrlFirebase(error), {
                    variant: 'error',
                })
            })
    }

    return (
        <>
            <DialogFileDetails value={value} open={open} setOpen={setOpen} />
            <ListItem
                style={{ width: '100vw' }}
                secondaryAction={(
                    <>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseFile}
                            PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: '14ch',
                                },
                            }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={downloadItem}>Download</MenuItem>
                            <MenuItem onClick={copyItemUrl}>Copy URL</MenuItem>
                            <DangerMenuItem onClick={deleteItem}>Apagar</DangerMenuItem>
                        </Menu>
                        <IconButton
                            edge='end'
                            onClick={handleClickFile}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </>
                )}
            >
                <div role='button' tabIndex={0} onClick={openDialog} style={{ display: 'flex', alignItems: 'center' }}>
                    <ListItemAvatar>
                        <Avatar>
                            <InsertDriveFileOutlinedIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={value.name}
                        secondary={`${humanFileSize(value.size, true)} - ${format(new Date(value.timeCreated), 'dd-MM-yyyy HH:mm:ss')}`}
                    />
                </div>
            </ListItem>
        </>
    )
}
export default ListItemFile
