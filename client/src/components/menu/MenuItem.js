import React from 'react';
import MuiMenuItem from '@material-ui/core/MenuItem';

const MenuItem = ({children, id, ...rest}) => (
        <MuiMenuItem {...rest}>
            {children}
        </MuiMenuItem>
);

export default MenuItem;