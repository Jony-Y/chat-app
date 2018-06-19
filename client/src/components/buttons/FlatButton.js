import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './button.css';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const FlatButton = ({containerClass, containerStyle, label, style, className, onClick, tooltip, ...rest}) => (
    <div className={containerClass} style={containerStyle}>
        {tooltip?(<Tooltip title={tooltip?tooltip:''}>
            <Button {...rest} onClick={onClick} variant="flat" style={style} className={className}>{label}</Button>
        </Tooltip>):(<Button {...rest} onClick={onClick} variant="flat" style={style} className={className}>{label}</Button>)}
    </div>
);

FlatButton.propTypes = {
    label:PropTypes.string.isRequired,
    onClick:PropTypes.func.isRequired,
    className:PropTypes.string,
    style:PropTypes.object,
    tooltip:PropTypes.string,
    containerClass:PropTypes.string,
    containerStyle:PropTypes.string

};

export default FlatButton;