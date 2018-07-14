import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';

const AppBar = ({children, className,style, ...rest}) => (
    <div className="flexbox-fill h-50">
        <MuiAppBar {...rest} style={style} position="static" className={`p-l-15 p-r-15 justify-center flex-row-wrap ${className}`}>
            <div className="font-reg-20 flex flex-start-center primary">{process.env.REACT_APP_NAME}</div>
            {children}
        </MuiAppBar>
    </div>
);

export default AppBar;