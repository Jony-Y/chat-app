import React from 'react';
import PropTypes from 'prop-types';
import './input.css';

const Input = ({className, style, type, onChange, value, ...rest}) =>(
    <input onChange={onChange} type={type||'text'} value={value} className={`base-input ${className}`} style={style} {...rest}/>
);

Input.propTypes = {
    className:PropTypes.string,
    style:PropTypes.object,
    type:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    value:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired
};

export default Input;