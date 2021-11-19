import { slide as Menu } from 'react-burger-menu'

import '../../styles/Sidebar.css'

import vi from '../../images/Vi_OriginalCentered.jpg'

export default props => {
    return (
        <Menu>
            <img src={vi} alt="Logo" style={{borderRadius: '50px'}}/>
            <a className="menu-item" href="/">
                To-do
            </a>
            <a className="menu-item" href="#">
                To-do
            </a>
            <a className="menu-item" href="#">
                To-do
            </a>
            <a className="menu-item" href="#">
                To-do
            </a>
        </Menu>
    );
};
