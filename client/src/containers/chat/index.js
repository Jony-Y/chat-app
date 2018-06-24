import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './chat.css';
import NewMessageForm from "./NewMessageForm";
import {chatMessages, chatMessagesPageCount, isFetchingChatMessages} from "../chatMessage/selectors";
import {fetchChatMessages, sendChatMessage, newMessageSuccess} from "../chatMessage/actions";
import ChatMessage from "../chatMessage/ChatMessage";
import isEmpty from 'lodash/isEmpty';
import userUtility from "../../utils/userUtility";
import {CHAT} from "../../constants/urlConstants";
import io from '../../utils/socket';
import ChatMessageList from "../chatMessage/ChatMessageList";
import CircularLoader from "../../components/loader/CircularLoader";
import {lightGray} from "../../themes/colors";
import ScrollWatch from "../../utils/ScrollWatch";
const OFFSET = 5;
class ChatContainer extends Component {

    componentDidMount(){
        this.scroller = new ScrollWatch('#chatMessageList');
        this.initChat(this.props.id);
    }

    componentDidUpdate(prevProps){
        if(!isEmpty(this.props.id) && this.props.id !== prevProps.id){
            this.initChat(this.props.id);
            this.scroller.scrollBottom();
        }
    }

    initChat = async(id) => {
        await this.props.fetchChatMessages(id);
        io.listen(`${CHAT}:${id}:message`, (payload) => {
            this.props.newMessageSuccess(id, payload);
            this.scroller.scrollBottom();
        });
        this.scroller.scrollBottom();
    };

    sendMessage = async(message) => {
      if(!isEmpty(message)){
          await this.props.sendChatMessage(this.props.id, message);
          this.scroller.scrollBottom();
      }
    };

    fetchNextPage = async(nextPage) => {
        this.scroller.savePosition();
        await this.props.fetchChatMessages(this.props.id, nextPage);
        this.scroller.scrollToPreviousPosition();
    };

    render(){
        const {messages, isFetching, pageCount} = this.props;
        return (
            <div className="chat-container flexbox flexbox-column-fill flex-start">
                <ChatMessageList id="chatMessageList" onFetchNext={this.fetchNextPage} pageCount={pageCount}>
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
        pageCount: chatMessagesPageCount(state, props.id),
        isFetching: isFetchingChatMessages(state)
    }
};
const mapDispatchToProps = (dispatch) => ({
    sendChatMessage : bindActionCreators(sendChatMessage, dispatch),
    fetchChatMessages:bindActionCreators(fetchChatMessages, dispatch),
    newMessageSuccess:bindActionCreators(newMessageSuccess, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);