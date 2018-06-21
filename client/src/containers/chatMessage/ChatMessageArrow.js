import React from 'react';

const ChatMessageArrow = ({isOwner}) => (
    <div className={`message-arrow ${isOwner?'sent':'received'}`}/>
);
export default ChatMessageArrow;