import React from 'react';
import MuiMenu from '@material-ui/core/Menu';
import './menu.css';

const anchorOrigin={
    vertical: 'bottom',
    horizontal: 'right',
};
const transformOrigin={
    vertical: 'top',
    horizontal: 'right',
};
const Menu = ({children, className, ...rest}) => (
    <MuiMenu {...rest} className="menu-base" getContentAnchorEl={null} anchorOrigin={anchorOrigin} transformOrigin={transformOrigin}>
        {children}
    </MuiMenu>
);

export default Menu;