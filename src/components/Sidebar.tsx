import { FunctionComponent, useContext } from 'react'
import { slide as Menu } from 'react-burger-menu'
import FolderIcon from '@mui/icons-material/Folder'
import TimelineIcon from '@mui/icons-material/TimelineOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import '../css/Sidebar.css'
import UserImageMockup from '../images/Vi_OriginalCentered.jpg'

import ProgressBar from './ProgressBar'
import { AuthContext } from './AuthContext'

const testData = [{ bgcolor: '#0178D4', completed: 46 }]

const Sidebar: FunctionComponent = () => {
    const { logout } = useContext(AuthContext)

    return (
        <Menu>
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
            <p style={{ fontSize: '1.4em', marginBottom: '0px' }}>Margot Robbie</p>
            <p style={{ fontSize: '0.8em', color: '#0178D4' }}>margot@email.com</p>
            <button type='button' className='btn btn-outline-primary btn-lg editButton'>
                {/*<LogoutIcon/> */}
                Edit Profile
            </button>

            <hr className='line' />

            <button type='button' className='btn btn-primary btn-lg menuButtons'>
                <FolderIcon />
                &nbsp;&nbsp;Files
                <ArrowForwardIosIcon style={{ float: 'right', marginTop: '0.1em' }} />
            </button>

            <button
                type='button'
                className='btn btn-outline-primary btn-lg menuButtons'
            >
                <TimelineIcon />
                &nbsp;&nbsp;Statistics
                <ArrowForwardIosIcon style={{ float: 'right', marginTop: '0.1em' }} />
            </button>

            <button
                type='button'
                className='btn btn-outline-primary btn-lg menuButtons'
            >
                <a className='menu-item aTagButtons' href='#' onClick={logout}>
                    <LogoutIcon />
                    &nbsp;&nbsp;Sign out
                </a>
            </button>

            <div className='card charCard'>
                <div className='card-body'>
                    <h5 className='card-title' style={{ fontSize: '1em' }}>
                        Available Space
                    </h5>
                    <p className='card-text'>
                        {testData.map((item, idx) => (
                            <ProgressBar
                                key={idx}
                                bgColor={item.bgcolor}
                                completed={item.completed}
                            />
                        ))}
                    </p>
                    <h6
                        className='card-subtitle mb-2'
                        style={{ float: 'right', fontSize: '0.8em', color: 'white' }}
                    >
                        2.3 GB used of 5 GB
                    </h6>
                </div>
            </div>

            {/*<button type="button" className="btn btn-primary btn-lg logOutButton"><LogoutIcon style={{marginBottom: '0.13em'}}/>&nbsp;&nbsp;Sign out</button>*/}
        </Menu>
    )
}
export default Sidebar
