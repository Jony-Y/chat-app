import React from 'react';
import PropTypes from 'prop-types';
import {white} from "../themes/colors";
import CSSTransition from "./CSSTransition";
import green from "@material-ui/core/colors/green";

const baseStyle = {
    background: green[300],
    borderRadius: '50%',
    minWidth: 24,
    textAlign: 'center',
    padding: '0 2px',
    color:white
};

const Badge = ({value, style, className}) => (
    <CSSTransition animation="pop" className="flexbox">
        {value && <div key={1} className={`pop-in ${className}`} style={Object.assign({}, baseStyle, style)}>{value}</div>}
    </CSSTransition>
);

Badge.propTypes = {
    value:PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className:PropTypes.string,
    style:PropTypes.object
};
export default Badge;