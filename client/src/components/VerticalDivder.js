import React from 'react';
import PropTypes from 'prop-types';
import {lightGray} from "../themes/colors";

const VerticalDivider = ({className, size, color}) => (
    <div className={`flexbox-fill ${className}`} style={{borderBottom:`${size || 1}px solid ${color || lightGray}`}}/>
);
VerticalDivider.propTypes = {
    size:PropTypes.number,
    color:PropTypes.string,
    className:PropTypes.string
};
export default VerticalDivider;