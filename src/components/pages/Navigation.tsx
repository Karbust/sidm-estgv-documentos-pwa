import { ChangeEvent, useState } from 'react'
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
    MemoryRouter as Router,
} from 'react-router-dom'

import '../../styles/NavigationStyle.css'

import Sidebar from './Sidebar'

import Menu from '@mui/material/Menu'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import Box from '@mui/system/Box'
import styled from '@emotion/styled'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/MenuOutlined'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import BottomNavigation from '@mui/material/BottomNavigation'
import TimelineIcon from '@mui/icons-material/TimelineOutlined'
import FolderIcon from '@mui/icons-material/Folder'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AccountCircle from '@mui/icons-material/AccountCircleOutlined'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'

import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

import '../../App.css'
import { Link } from '@mui/material'

import { MAIN_PATH } from '../Routes'

const SpeedDialStyled = styled(Button)`
  position: absolute !important;
  right: 5% !important;
  bottom: 0 !important;
  margin-bottom: 74px !important;
  width: 4rem;
  height: 4rem;
`

const style = {
    transform: 'translate(0%, 0%)',
    bgcolor: '#0c1222',
    color: 'white',
    border: 'none',
    position: 'absolute',
    width: '100%',
    height: '14rem',
    bottom: '0%',
    left: '0',
    textAlign: 'center',
    fontFamily: '"Poppins"',
};

const speedDialActions: Array<{ icon: JSX.Element; name: string }> = [
    { icon: <CreateNewFolderOutlinedIcon />, name: 'Create Folder' },
    { icon: <FolderIcon />, name: 'Upload Folder' },
    { icon: <InsertDriveFileOutlinedIcon />, name: 'Upload File' },
]

const StyledBurger = styled.button`
  position: absolute;
  top: 5%;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.primaryLight};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }
`;

function Navigation() {
    const [value, setValue] = useState<number>(0)
    const [auth, setAuth] = useState<boolean>(true)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openSpeedDial, setOpenSpeedDial] = useState<boolean>(false)

    const handleOpenSpeedDial = () => setOpenSpeedDial(true)
    const handleCloseSpeedDial = () => setOpenSpeedDial(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setAuth(event.target.checked)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='absolute'>
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                        style={{ alignItems: 'center', justifyContent: 'center', marginLeft: '45px'}}
                    >
                        SIDM
                    </Typography>
                </Toolbar>
            </AppBar>

            {/*<SpeedDial
                ariaLabel='SpeedDial tooltip example'
                icon={<SpeedDialIcon />}
                onClose={handleCloseSpeedDial}
                onOpen={handleOpenSpeedDial}
                open={openSpeedDial}
                className='fabButton'
            >
                {speedDialActions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                    />
                ))}
            </SpeedDial>*/}

            <SpeedDialStyled onClick={handleOpen}><SpeedDialIcon /></SpeedDialStyled>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" style={{ marginTop: '16px', fontFamily: 'Poppins', fontSize: '1.2em'}}>
                        Create New
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {/*<Button variant="outlined" startIcon={<InsertDriveFileIcon />}>Upload File</Button> <br/>
                        <Button variant="outlined" startIcon={<FolderIcon />}>Upload Folder</Button> <br/>
                        <Button variant="outlined" startIcon={<CreateNewFolderIcon />}>Create Folder</Button>*/}
                        <div className="d-grid gap-2 d-lg-block">
                            <button className="btn btn-outline-primary secondaryButton btn-sm ms-3 mt-1 me-3" type="button"> <FolderIcon /> <br/>Folder</button>
                            <button className="btn btn-primary primaryButton2 btn-sm ms-3 mt-2 me-3" type="button"> <FileUploadIcon /> <br/> Upload</button>
                        </div>
                    </Typography>
                </Box>
            </Modal>

            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                className='navBarBottom'
            >
                <BottomNavigationAction
                    label='Files'
                    icon={<FolderIcon />}
                    component={RouterLink}
                    to={`${MAIN_PATH}/Files`}
                />

                {/*<BottomNavigationAction
                    icon={<AddIcon />}
                    onClick={handleOpen}
                    style={{background: '#FF7F50', color:'white', width: '50%'}}
                />*/}

                <button type="button" className="btn btn-primary primaryButton" onClick={handleOpen}><AddIcon /></button>

                <BottomNavigationAction
                    label='Statistics'
                    icon={<TimelineIcon />}
                    component={RouterLink}
                    to={`${MAIN_PATH}/Statistics`}
                />

                {/*<BottomNavigationAction
                    label='Menu'
                    icon={<MenuIcon />}
                    component={RouterLink}
                />*/}
            </BottomNavigation>
        </Box>
    )
}

export default Navigation
