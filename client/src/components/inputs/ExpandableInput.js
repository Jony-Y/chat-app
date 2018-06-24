import React from 'react';
import PropTypes from 'prop-types';

const ExpandableInput = ({className, style, onChange, value, ...rest}) =>(
    <div contentEditable={true} onChange={onChange} className={`form-control base-input black ${className}`} style={style} {...rest}>
        {!value && <span className="lighter-gray">{rest.placeholder}</span>}
        {value}
    </div>
);

ExpandableInput.propTypes = {
    className:PropTypes.string,
    style:PropTypes.object,
    onChange:PropTypes.func.isRequired,
    value:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired
};

export default ExpandableInput;