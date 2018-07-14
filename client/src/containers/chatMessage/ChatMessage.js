import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './chatMessage.css';
import ChatMessageArrow from "./ChatMessageArrow";

const ChatMessage = ({message, isOwner}) => (
    <div className={`flexbox-fill flex-${isOwner?'end':'start'}-center`}>
        <div className={`chat-message ${isOwner?'sent':'received'}`}>
            <ChatMessageArrow isOwner={isOwner}/>
            {!isOwner && <div className="user">{message.owner.name}</div>}
            <div className="body">{message.body}</div>
            <div className="date">{moment(message.creationDate).format('ll')}</div>
        </div>
    </div>
);

ChatMessage.propTypes = {
    message:PropTypes.object.isRequired
};

export default ChatMessage;