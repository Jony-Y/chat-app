import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './chat.css';
import NewMessageForm from "./NewMessageForm";
import {chatMessages} from "./selectors";
import {addMessage} from "./actions";
import ChatMessage from "./ChatMessage";
import io from 'socket.io-client';
import isEmpty from 'lodash/isEmpty';

class ChatContainer extends Component {
    constructor(props){
        super(props);
        this.state = {messages:[]};

    }

    componentDidMount(){
        this.socket = io.connect(process.env.REACT_APP_SOCKET_URL);
        this.socket.on('RECEIVE_MESSAGE', (data) => {
            this.setState({messages:[...this.state.messages,data]});

        })
    }

    addMessage = (message) => {
        if(!isEmpty(message)) {
            this.socket.emit('SEND_MESSAGE', {
                author: 'me',
                id: Date.now(),
                body: message,
                creationDate: Date.now()
            });
        }
    };

    render(){
        //const {addMessage, messages} = this.props;
        const {messages} = this.state;
        return (
            <div className="chat-container flexbox flexbox-column-fill flex-start">
                <div className="chat-body p-l-15">
                    {messages.map(message => <ChatMessage key={message.id} message={message}/>)}
                </div>
                <NewMessageForm onSubmit={this.addMessage}/>
            </div>
        )
    }
}

ChatContainer.propTypes = {
    id:PropTypes.string
};

// const mapStateToProps = (state, props) => {
//     return {
//         messages: chatMessages(state, props.id)
//     }
// };
// const mapDispatchToProps = (dispatch) => ({
//     addMessage : bindActionCreators(addMessage, dispatch)
// });
//export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
export default ChatContainer;