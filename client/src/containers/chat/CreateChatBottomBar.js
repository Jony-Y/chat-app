import React from 'react';
import CSSTransition from "../../components/CSSTransition";

const CreateChatBottomBar = ({show, children}) => (
  <CSSTransition animation="fade" className="create-chat-bottom-bar">
      {show && children}
  </CSSTransition>
);

export default CreateChatBottomBar;