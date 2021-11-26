import { useEffect, useState } from 'react'
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
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import '../../App.css'
import '../../css/NavigationStyle.css'
import Sidebar from '../Sidebar'
import { MAIN_PATH } from '../Routes'
import IndexedDb from '../../indexedDb'

const BottomNav = styled(BottomNavigation)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  position: absolute;
  width: 100%;
  height: 4rem;
  bottom: 0;
  left: 0;
  background: #1f1c1f;
  z-index: 1;
  
  .MuiBottomNavigationAction-root {
    color: white;
    border-radius: 11px;
    z-index: 1;
  }

  .MuiBottomNavigationAction-label {
    font-size: 0.92em;
    font-family: "Poppins", sans-serif !important;
  }

  .Mui-selected {
    color: #E40B0B !important; 
    border-radius: 11px;
  }
`

const BoxStyled = styled(Box)`
  transform: translate(0%, 0%);
  background-color: #1f1c1f;
  color: white;
  border: none;
  position: fixed;
  width: 100%;
  height: fit-content;
  bottom: 0;
  left: 0;
  text-align: center;
  font-family: "Poppins",sans-serif;
`

function Navigation() {
    const [value, setValue] = useState<number>(0)

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)
    const handleClose = () => setOpen(false)

    useEffect(() => {
        const runIndexDb = async () => {
            const indexedDb = new IndexedDb('test')
            await indexedDb.createObjectStore(['books', 'students'])
            await indexedDb.putValue('books', { name: 'A Game of Thrones' })
            await indexedDb.putBulkValue('books', [{ name: 'A Song of Fire and Ice' }, { name: 'Harry Potter and the Chamber of Secrets' }])
            await indexedDb.getValue('books', 1)
            await indexedDb.getAllValue('books')
            await indexedDb.deleteValue('books', 1)

            const response = await fetch('https://c8.alamy.com/comp/EPF1YW/nun-with-handgun-isolated-on-white-EPF1YW.jpg')
            const imgBlob = await response.blob()

            await indexedDb.putValue('students', { name: 'teste', content: imgBlob })

            const responseiDb = await indexedDb.getValue('students', 1)
            const url = URL.createObjectURL(responseiDb.content)
            const img = new Image()
            img.src = url
            document.body.appendChild(img)
        }
        (async () => runIndexDb())()
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='absolute' style={{ boxShadow: 'none' }}>
                <Sidebar />
                <Toolbar style={{
                    minHeight: '4em',
                    background: '#1F1C1F'
                }}
                >
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                        style={{ alignItems: 'center', justifyContent: 'center', marginLeft: '45px', fontFamily: 'Poppins' }}
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
                    <Typography id='modal-modal-title' variant='h6' style={{ marginTop: '1em', marginBottom: '1em', fontFamily: 'Poppins', fontSize: '1em' }}>
                        Create New
                    </Typography>
                    <Typography id='modal-modal-description'>
                        {/*<div className='d-grid d-lg-block'>
                            <button className='btn btn-primary btn-lg secondaryButton' type='button'>
                                <FolderIcon/>&nbsp;&nbsp;Folder
                            </button>
                            <button className='btn btn-primary btn-lg primaryButton2' type='button'>
                                <FileUploadIcon />&nbsp;Upload
                            </button>
                        </div>*/}

                        <div className='btn-group col-12' style={{ marginBottom: '16px' }} role='group' aria-label='Basic example'>
                            <button className='btn btn-primary btn-lg secondaryButton' type='button'>
                                <CreateNewFolderIcon />
                                Folder
                            </button>
                            <button className='btn btn-primary btn-lg primaryButton2' type='button'>
                                <FileUploadIcon />
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
                style={{ zIndex: 1 }}
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
