import React from 'react';
import MuiMenuList from '@material-ui/core/MenuList';
import CSSTransition from "../CSSTransition";

const MenuList = ({children, className, ...rest}) => (
    <MuiMenuList {...rest} className={className}>
        <CSSTransition animation="fade">
            {children}
        </CSSTransition>
    </MuiMenuList>
);

export default MenuList;