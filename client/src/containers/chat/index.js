import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './chat.css';
import NewMessageForm from "./NewMessageForm";
import {chatMessages} from "../chatMessage/selectors";
import {fetchChatMessages, sendChatMessage} from "../chatMessage/actions";
import ChatMessage from "../chatMessage/ChatMessage";
import io from 'socket.io-client';
import isEmpty from 'lodash/isEmpty';

class ChatContainer extends Component {

    componentDidMount(){
        this.props.fetchChatMessages(this.props.id);
        this.socket = io.connect(process.env.REACT_APP_SOCKET_URL);
        this.socket.on('general', (data) => {
            console.log(data)
        })
    }

    sendMessage = (message) => {
      if(!isEmpty(message)){
          this.props.sendChatMessage(message, this.props.id);
      }
    };

    render(){
        const {messages} = this.props;
        return (
            <div className="chat-container flexbox flexbox-column-fill flex-start">
                <div className="chat-body p-l-15">
                    {messages.map(message => <ChatMessage key={message.id} message={message}/>)}
                </div>
                <NewMessageForm onSubmit={this.sendMessage}/>
            </div>
        )
    }
}

ChatContainer.propTypes = {
    id:PropTypes.string
};

const mapStateToProps = (state, props) => {
    return {
        messages: chatMessages(state, props.id)
    }
};
const mapDispatchToProps = (dispatch) => ({
    sendChatMessage : bindActionCreators(sendChatMessage, dispatch),
    fetchChatMessages:bindActionCreators(fetchChatMessages, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);