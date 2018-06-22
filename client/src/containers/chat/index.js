import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './chat.css';
import NewMessageForm from "./NewMessageForm";
import {chatMessages, isFetchingChatMessages} from "../chatMessage/selectors";
import {fetchChatMessages, sendChatMessage, newMessageSuccess} from "../chatMessage/actions";
import ChatMessage from "../chatMessage/ChatMessage";
import isEmpty from 'lodash/isEmpty';
import userUtility from "../../utils/userUtility";
import {CHAT} from "../../constants/urlConstants";
import io from '../../utils/socket';
import ChatMessageList from "../chatMessage/ChatMessageList";
import CircularLoader from "../../components/loader/CircularLoader";
import {lightGray} from "../../themes/colors";

class ChatContainer extends Component {

    componentDidMount(){
        this.props.fetchChatMessages(this.props.id);
        io.listen(`${CHAT}:${this.props.id}:message`, (payload) => {
            this.props.newMessageSuccess(this.props.id, payload);
        })
    }

    sendMessage = (message) => {
      if(!isEmpty(message)){
          this.props.sendChatMessage(this.props.id, message);
      }
    };

    render(){
        const {messages, isFetching} = this.props;
        return (
            <div className="chat-container flexbox flexbox-column-fill flex-start">
                <ChatMessageList>
                    {isFetching && <CircularLoader size={30} thickness={4} style={{color:lightGray}}/>}
                    {messages.map(message => <ChatMessage key={message.id} isOwner={userUtility.isOwner(message.owner)} message={message}/>)}
                </ChatMessageList>
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
        messages: chatMessages(state, props.id),
        isFetching: isFetchingChatMessages(state)
    }
};
const mapDispatchToProps = (dispatch) => ({
    sendChatMessage : bindActionCreators(sendChatMessage, dispatch),
    fetchChatMessages:bindActionCreators(fetchChatMessages, dispatch),
    newMessageSuccess:bindActionCreators(newMessageSuccess, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);