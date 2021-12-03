import { FunctionComponent, MouseEvent, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ListItemButton from '@mui/material/ListItemButton'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import Menu from '@mui/material/Menu'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { StorageReference } from 'firebase/storage'
import { useSnackbar } from 'notistack'

import { deleteFolderContents, MAIN_PATH } from '../functions'
import { Context } from '../reducer/Store'

const DangerMenuItem = styled(MenuItem)`
    color: #fff;
    background-color: #f00;

    &:hover {
        color: #000;
    }
`

interface Props {
    value: StorageReference
}

const ListItemFile: FunctionComponent<Props> = ({ value }) => {
    // @ts-ignore
    const { dispatch, state } = useContext(Context)

    const { enqueueSnackbar } = useSnackbar()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleClickFile = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
    const handleCloseFile = () => setAnchorEl(null)

    const deleteItem = () => {
        deleteFolderContents(value.fullPath, dispatch, state)
            .then(() => {
                enqueueSnackbar('Folder successfully deleted.', {
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

    return (
        <ListItem
            style={{ width: '100vw' }}
            disablePadding
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
            <ListItemButton component={Link} to={`${MAIN_PATH}/Files${value && `?folder=${value.name}`}`}>
                <ListItemAvatar>
                    <Avatar>
                        <FolderOutlinedIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={value.name}
                />
            </ListItemButton>
        </ListItem>
    )
}
export default ListItemFile
