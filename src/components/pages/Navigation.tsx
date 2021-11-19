import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Box from '@mui/system/Box'
import styled from '@emotion/styled'
import Modal from '@mui/material/Modal'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import FolderIcon from '@mui/icons-material/Folder'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import BottomNavigation from '@mui/material/BottomNavigation'
import TimelineIcon from '@mui/icons-material/TimelineOutlined'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import '../../App.css'
import Sidebar from '../Sidebar'
import { MAIN_PATH } from '../Routes'
import '../../css/NavigationStyle.css'

const BottomNav = styled(BottomNavigation)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  position: absolute;
  width: 100%;
  height: 4rem;
  bottom: 0%;
  left: 0;
  background: #0c1222;
  font-family: "Poppins", sans-serif !important;
  z-index: 1;
  
  .MuiBottomNavigationAction-root {
    color: white;
    z-index: 1;
  }

  .MuiBottomNavigationAction-label {
    font-size: 0.9em;
  }

  .Mui-selected {
    color: #FF7F50 !important;
    border-radius: 50px;
  }
`

const BoxStyled = styled(Box)`
  transform: translate(0%, 0%);
  background-color: #0c1222;
  color: white;
  border: none;
  position: absolute;
  width: 100%;
  height: 14rem;
  bottom: 0;
  left: 0;
  text-align: center;
  font-family: "Poppins";
`

function Navigation() {
    const [value, setValue] = useState<number>(0)
    const [auth, setAuth] = useState<boolean>(true)

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='absolute' style={{ backgroundColor: '#0c1222' }}>
                <Sidebar />
                <Toolbar style={{
                    minHeight: '4em',
                    backgroundColor: '#0c1222'
                }}
                >
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                        style={{ alignItems: 'center', justifyContent: 'center', marginLeft: '45px' }}
                    >
                        SIDM
                    </Typography>
                </Toolbar>
            </AppBar>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <BoxStyled>
                    <Typography id='modal-modal-title' variant='h6' style={{ marginTop: '16px', fontFamily: 'Poppins', fontSize: '1.2em' }}>
                        Create New
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        {/*<Button variant="outlined" startIcon={<InsertDriveFileIcon />}>Upload File</Button> <br/>
                        <Button variant="outlined" startIcon={<FolderIcon />}>Upload Folder</Button> <br/>
                        <Button variant="outlined" startIcon={<CreateNewFolderIcon />}>Create Folder</Button>*/}
                        <div className='d-grid gap-2 d-lg-block'>
                            <button className='btn btn-outline-primary secondaryButton btn-sm ms-3 mt-1 me-3' type='button'>
                                {' '}
                                <FolderIcon />
                                {' '}
                                <br />
                                Folder
                            </button>
                            <button className='btn btn-primary primaryButton2 btn-sm ms-3 mt-2 me-3' type='button'>
                                {' '}
                                <FileUploadIcon />
                                {' '}
                                <br />
                                {' '}
                                Upload
                            </button>
                        </div>
                    </Typography>
                </BoxStyled>
            </Modal>

            <BottomNav
                showLabels
                value={value}
                onChange={(event, newValue) => setValue(newValue)}
                className='navBarBottom'
                style={{ zIndex: 1100 }}
            >
                <BottomNavigationAction
                    label='Files'
                    icon={<FolderIcon />}
                    component={RouterLink}
                    to={`${MAIN_PATH}/Files`}
                />
                <button
                    type='button'
                    className='btn btn-primary primaryButton'
                    onClick={handleOpen}
                >
                    <AddIcon />
                </button>
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
