import {
    FunctionComponent, SetStateAction, useContext, useEffect, useState
} from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'
import FolderIcon from '@mui/icons-material/Folder'
import LogoutIcon from '@mui/icons-material/Logout'
import TimelineIcon from '@mui/icons-material/TimelineOutlined'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import '../css/Sidebar.css'
import { auth } from '../firebase/config'
import { getCurrentUser, MAIN_PATH } from '../functions'
import { useOnlineStatus } from '../lib/useOnlineStatus'
import UserImageMockup from '../images/Vi_OriginalCentered.jpg'

import { AuthContext } from './AuthContext'

interface Props {
    openSidebar: boolean
    setOpenSidebar: (value: SetStateAction<boolean>) => void
}

const Sidebar: FunctionComponent<Props> = ({ openSidebar, setOpenSidebar }) => {
    const isOnline = useOnlineStatus()
    const { logout } = useContext(AuthContext)

    const [name, setName] = useState<string>('')

    useEffect(() => {
        getCurrentUser(isOnline)
            .then((data) => setName(data?.fullName))
            .catch(console.error)
    }, [])

    return (
        <Menu
            isOpen={openSidebar}
            onStateChange={(state) => setOpenSidebar(state.isOpen)}
        >
            <img
                src={UserImageMockup}
                alt='User'
                style={{
                    borderRadius: '11px',
                    width: '5em',
                    alignItems: 'center',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '3em',
                }}
            />
            <p style={{ fontSize: '1.4em', marginBottom: '0px' }}>{name}</p>
            <p style={{ fontSize: '0.8em', color: '#0178D4' }}>{auth.currentUser?.email}</p>

            <hr className='line' />

            <Link
                to={`${MAIN_PATH}/Files`}
                type='button'
                className='btn btn-primary btn-lg menuButtons'
                onClick={() => setOpenSidebar(false)}
            >
                <FolderIcon />
                &nbsp;&nbsp;Files
                <ArrowForwardIosIcon style={{ float: 'right', marginTop: '0.1em' }} />
            </Link>

            <Link
                to={`${MAIN_PATH}/Statistics`}
                type='button'
                className='btn btn-outline-primary btn-lg menuButtons'
                onClick={() => setOpenSidebar(false)}
            >
                <TimelineIcon />
                &nbsp;&nbsp;Statistics
                <ArrowForwardIosIcon style={{ float: 'right', marginTop: '0.1em' }} />
            </Link>

            <button
                type='button'
                className='btn btn-outline-primary btn-lg menuButtons'
            >
                <a className='menu-item aTagButtons' href='#' onClick={logout}>
                    <LogoutIcon />
                    &nbsp;&nbsp;Sign out
                </a>
            </button>

            {/*<button type="button" className="btn btn-primary btn-lg logOutButton"><LogoutIcon style={{marginBottom: '0.13em'}}/>&nbsp;&nbsp;Sign out</button>*/}
        </Menu>
    )
}
export default Sidebar
