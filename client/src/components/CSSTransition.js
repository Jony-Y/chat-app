import React from 'react';
import PropTypes from 'prop-types'
import {CSSTransitionGroup} from "react-transition-group";
import isEmpty from "lodash/isEmpty";

const CSSTransition = ({animation, className, timeout, children}) => {
    const transitionTimeout = isEmpty(timeout)?{enter:0,leave:0}:timeout;
    return (
        <CSSTransitionGroup transitionName={animation} className={className}
                            transitionEnterTimeout={transitionTimeout.enter}
                            transitionLeaveTimeout={transitionTimeout.leave}>
            {children}
        </CSSTransitionGroup>
    )
};
CSSTransition.propTypes = {
  animation:PropTypes.string.isRequired,
  className:PropTypes.string,
  children:PropTypes.node,
  timeout:PropTypes.shape({
      enter: PropTypes.number.isRequired,
      leave: PropTypes.number.isRequired,
  })
};

export default CSSTransition;