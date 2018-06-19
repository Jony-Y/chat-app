import React from 'react';
import PropTypes from 'prop-types';
import './drawer.css';
import MuiDrawer from '@material-ui/core/Drawer';
import IconButton from "../buttons/IconButton";
import {gray} from "../../themes/colors";
import MdArrowBack from 'react-icons/lib/md/arrow-back';
const Drawer  = ({children, className, bodyClass, onClose, header, ...rest}) => (
    <MuiDrawer className={className} {...rest} onClose={onClose}>
        <div className={`drawer-body ${bodyClass}`}>
            <div className="flexbox-fill flex-start-center p-15">
                <IconButton className="icon-btn-sm" onClick={onClose} tooltip="Close"><MdArrowBack style={{fontSize:20, color:gray}}/></IconButton>
                <div className="drawer-header p-l-15">{header}</div>
            </div>
        {children}
        </div>
    </MuiDrawer>
);

Drawer.propTypes = {
    children:PropTypes.node,
    className:PropTypes.string,
    bodyClass:PropTypes.string,
    onClose:PropTypes.func.isRequired,
    header:PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

export default Drawer;