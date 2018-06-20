import React , {Component} from 'react';
import PropTypes from 'prop-types';
import './chat.scss';
import SearchFilterBar from "../../components/inputs/SearchFilterBar";
import SearchFilter from "../../components/inputs/SearchFilter";
import VerticalDivider from "../../components/VerticalDivder";
import {go} from "../../utils/navigationUtility";
import ChatList from "./ChatList";
import ChatListItem from "./ChatListItem";
import isEmpty from "lodash/isEmpty";

class ChatPicker extends Component {
    constructor(props){
        super(props);
        this.state = {activeChat:props.activeChat, filteredChats:props.chats ||  []};
    }

    componentDidUpdate(prevProps){
        if(prevProps.chats.length !== this.props.chats.length && isEmpty(this.state.filterChats)){
            this.setState({filteredChats:this.props.chats});
        }
        if(prevProps.activeChat !== this.props.activeChat){
            this.setState({activeChat:this.props.activeChat});
        }
    }

    setActiveChat= (chatID) => {
        this.setState({activeChat:chatID});
        go('/',{chat:chatID});
    };

    filterChats = (filter) => {
        this.setState({filteredChats: this.props.chats.filter(chat => chat.name.toLowerCase().includes(filter.toLowerCase()))});
    };

    render(){
        const {activeChat, filteredChats} = this.state;
        return (
            <div className="chat-picker-container">
                <SearchFilterBar>
                    <SearchFilter onChange={this.filterChats}/>
                </SearchFilterBar>
                <VerticalDivider className="m-t-5"/>
                <ChatList>
                    {filteredChats.map(chat => <ChatListItem key={chat.id} onClick={this.setActiveChat}
                                                     isSelected={activeChat === chat.id} chat={chat}/>)}
                </ChatList>
            </div>
        )
    }
}

ChatPicker.propTypes = {
    chats:PropTypes.array.isRequired,
    onClick:PropTypes.func.isRequired,
    activeChat:PropTypes.string
};

export default ChatPicker;