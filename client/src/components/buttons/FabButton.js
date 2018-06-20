import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './button.css';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

const FabButton = ({containerClass, containerStyle, children, style, className, onClick, tooltip, ...rest}) => (
    <div className={containerClass} style={containerStyle}>
        {tooltip?(<Tooltip title={tooltip?tooltip:''}>
            <div className="flexbox-fill">
                <Button {...rest} onClick={onClick} variant="fab" style={style} className={className}>{children}</Button>
            </div>
        </Tooltip>):(<Button {...rest} onClick={onClick} variant="fab" style={style} className={className}>{children}</Button>)}
    </div>
);

FabButton.propTypes = {
    children:PropTypes.node.isRequired,
    onClick:PropTypes.func,
    className:PropTypes.string,
    style:PropTypes.object,
    tooltip:PropTypes.string,
    containerClass:PropTypes.string,
    containerStyle:PropTypes.string

};

export default FabButton;