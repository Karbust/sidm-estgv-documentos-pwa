import { ChangeEvent, useState } from 'react'
import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
    MemoryRouter as Router,
} from 'react-router-dom'
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
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined'
import AccountCircle from '@mui/icons-material/AccountCircleOutlined'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'

import '../../App.css'
import { Link } from '@mui/material'

import { MAIN_PATH } from '../Routes'

const BottomNav = styled(BottomNavigation)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  position: absolute;
  width: 100%;
  bottom: 0;
  background: linear-gradient(0deg, #F7F7F7, #F7F7F7), #FFFBFE;
`

const SpeedDialStyled = styled(SpeedDial)`
  position: absolute !important;
  right: 0 !important;
  margin-right: 16px !important;
  bottom: 0 !important;
  margin-bottom: 74px !important;
  
  .MuiSpeedDialAction-staticTooltipLabel {
    width: 103px;
  }
`

const FabName = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-transform: none;
  /* identical to box height, or 143% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1px;

  /* M3/sys/light/on-primary-container */

  color: #21005D;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 0px;
`

const speedDialActions: Array<{ icon: JSX.Element; name: string }> = [
    { icon: <CreateNewFolderOutlinedIcon />, name: 'Create Folder' },
    { icon: <FolderOutlinedIcon />, name: 'Upload Folder' },
    { icon: <InsertDriveFileOutlinedIcon />, name: 'Upload File' },
]

function Navigation() {
    const [value, setValue] = useState<number>(0)
    const [auth, setAuth] = useState<boolean>(true)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [openSpeedDial, setOpenSpeedDial] = useState<boolean>(false)

    const handleOpenSpeedDial = () => setOpenSpeedDial(true)
    const handleCloseSpeedDial = () => setOpenSpeedDial(false)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setAuth(event.target.checked)

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='absolute'>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} style={{ textAlign: 'center' }}>
                        SIDM
                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleMenu}
                                color='inherit'
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>

            <SpeedDialStyled
                ariaLabel='SpeedDial tooltip example'
                icon={<SpeedDialIcon />}
                onClose={handleCloseSpeedDial}
                onOpen={handleOpenSpeedDial}
                open={openSpeedDial}
            >
                {speedDialActions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                    />
                ))}
            </SpeedDialStyled>

            <BottomNav
                showLabels
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                className='navBarBottom'
                style={{ zIndex: 1100 }}
            >
                <BottomNavigationAction
                    label='Files'
                    icon={<InsertDriveFileOutlinedIcon />}
                    component={RouterLink}
                    to={`${MAIN_PATH}/Files`}
                />
                <BottomNavigationAction
                    label='Statistics'
                    icon={<TimelineIcon />}
                    component={RouterLink}
                    to={`${MAIN_PATH}/Statistics`}
                />
            </BottomNav>
        </Box>
    )
}

export default Navigation
