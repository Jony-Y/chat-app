import React from 'react';
import PropTypes from 'prop-types';
import MuiIconButton from '@material-ui/core/IconButton';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const IconButton = ({containerClass, containerStyle, tooltip,children,...rest}) => (
    <div className={containerClass} style={containerStyle}>
        {tooltip?(<Tooltip title={tooltip?tooltip:null}>
            <MuiIconButton {...rest}>{children}</MuiIconButton>
        </Tooltip>):(<MuiIconButton {...rest}>{children}</MuiIconButton>)}
    </div>
);
IconButton.propTypes = {
    containerClass:PropTypes.string,
    containerStyle:PropTypes.string,
    children:PropTypes.node.isRequired,
    tooltip:PropTypes.string
};
export default IconButton;