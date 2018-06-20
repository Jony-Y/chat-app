import React from 'react';
import MuiMenuItem from '@material-ui/core/MenuItem';

const MenuItem = ({children, className,separator, ...rest}) => (
        <MuiMenuItem className={`${separator?'menu-list-item':''} ${className}`} {...rest}>
            {children}
        </MuiMenuItem>
);

export default MenuItem;