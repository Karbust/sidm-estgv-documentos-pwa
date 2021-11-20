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
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

import '../../App.css'
import Sidebar from '../Sidebar'
import { MAIN_PATH } from '../Routes'
import '../../css/NavigationStyle.css'
import IndexedDb from '../../indexedDb'

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

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
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

            const response = await fetch('https://scontent.fopo5-1.fna.fbcdn.net/v/t39.30808-6/258841483_1065106997604207_7128735727571181408_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeHiP3S-0doGdEjXversh1_kdGlMN1JE4j50aUw3UkTiPu83TOXkgtu9N0-hJ_DmF_baZt4XlshTA0mIljOtK3hO&_nc_ohc=MiamnP4RwaoAX80ap61&_nc_ht=scontent.fopo5-1.fna&oh=17ca9718fa09d76040de24e12edc2908&oe=619D6FAC')
            const imgBlob = await response.blob()

            await indexedDb.putValue('students', { name: 'teste', content: imgBlob })

            const responseiDb = await indexedDb.getValue('students', 1)
            const url = URL.createObjectURL(responseiDb.content)
            const img = new Image()
            img.src = url
            document.body.appendChild(img)
        }
        runIndexDb()
    }, [])

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
