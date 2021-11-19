import { FunctionComponent } from 'react'
import { slide as Menu } from 'react-burger-menu'

import '../css/Sidebar.css'

import UserImageMockup from '../images/Vi_OriginalCentered.jpg'

const Sidebar: FunctionComponent = () => (
    <Menu>
        <img src={UserImageMockup} alt='User' style={{ borderRadius: '50px' }} />
        <a className='menu-item' href='/'>
            To-do
        </a>
        <a className='menu-item' href='#'>
            To-do
        </a>
        <a className='menu-item' href='#'>
            To-do
        </a>
        <a className='menu-item' href='#'>
            To-do
        </a>
    </Menu>
)
export default Sidebar
