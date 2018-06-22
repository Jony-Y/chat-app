import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const CircularLoader = (props) => (
        <div style={props.containerStyle} className="flexbox flex-center">
                <CircularProgress style={Object.assign({},props.style,{zIndex:999999})}
                                  color={props.color || 'inherit'} size={props.size} thickness={props.thickness}/>
        </div>
);

CircularLoader.propTypes = {
    color:PropTypes.string,
    size:PropTypes.number,
    thickness:PropTypes.number,
    style:PropTypes.object,
    containerStyle:PropTypes.object
};
export default CircularLoader;