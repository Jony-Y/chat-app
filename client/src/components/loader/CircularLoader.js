import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import './loader.css';

const CircularLoader = (props) => (
        <div style={props.containerStyle} className={`flexbox flex-center ${props.className}`}>
                <CircularProgress style={Object.assign({},props.style,{zIndex:999999})}
                                  color={props.color || 'inherit'} size={props.size} thickness={props.thickness}/>
        </div>
);

CircularLoader.propTypes = {
    color:PropTypes.string,
    size:PropTypes.number,
    thickness:PropTypes.number,
    style:PropTypes.object,
    containerStyle:PropTypes.object,
    className:PropTypes.string
};
export default CircularLoader;