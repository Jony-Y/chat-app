import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './button.css';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const RaisedButton = ({containerClass, containerStyle, label, style, className, onClick, tooltip, ...rest}) => (
    <div className={containerClass} style={containerStyle}>
        {tooltip?(<Tooltip title={tooltip?tooltip:null}>
            <div className="flexbox-fill">
                <Button {...rest} onClick={onClick} variant="raised" style={style} className={className}>{label}</Button>
            </div>
        </Tooltip>):(<Button {...rest} onClick={onClick} variant="raised" style={style} className={className}>{label}</Button>)}
    </div>
);

RaisedButton.propTypes = {
    label:PropTypes.string.isRequired,
    onClick:PropTypes.func,
    className:PropTypes.string,
    style:PropTypes.object,
    tooltip:PropTypes.string,
    containerClass:PropTypes.string,
    containerStyle:PropTypes.string

};
export default RaisedButton;