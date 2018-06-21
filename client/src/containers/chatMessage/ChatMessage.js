import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Avatar from "../../components/Avatar";
import './chatMessage.css';

const ChatMessage = ({message}) => (
    <div className="flexbox-fill flex-start-center">
        <Avatar/>
        <div className="chat-message">
            <div className="body">{message.body}</div>
            <div className="date">{moment(message.creationDate).format('ll')}</div>
        </div>
    </div>
);

ChatMessage.propTypes = {
    message:PropTypes.object.isRequired
};

export default ChatMessage;