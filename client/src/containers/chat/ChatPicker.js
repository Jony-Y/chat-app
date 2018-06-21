import React , {Component} from 'react';
import PropTypes from 'prop-types';
import './chat.scss';
import SearchFilterBar from "../../components/inputs/SearchFilterBar";
import SearchFilter from "../../components/inputs/SearchFilter";
import VerticalDivider from "../../components/VerticalDivder";
import ChatList from "./ChatList";
import ChatListItem from "./ChatListItem";
import isEmpty from "lodash/isEmpty";

class ChatPicker extends Component {
    constructor(props){
        super(props);
        this.state = {filteredChats:props.chats ||  []};
    }

    componentDidUpdate(prevProps){
        if(prevProps.chats.length !== this.props.chats.length && isEmpty(this.state.filterChats)){
            this.setState({filteredChats:this.props.chats});
        }
        if(prevProps.activeChat !== this.props.activeChat){
            this.setState({activeChat:this.props.activeChat});
        }
    }

    filterChats = (filter) => {
        this.setState({filteredChats: this.props.chats.filter(chat => chat.name.toLowerCase().includes(filter.toLowerCase()))});
    };

    render(){
        const {filteredChats} = this.state;
        const {onSelect, activeChat} = this.props;
        return (
            <div className="chat-picker-container">
                <SearchFilterBar>
                    <SearchFilter onChange={this.filterChats}/>
                </SearchFilterBar>
                <VerticalDivider className="m-t-5"/>
                <ChatList>
                    {filteredChats.map(chat => <ChatListItem key={chat.id} onClick={onSelect}
                                                     isSelected={activeChat === chat.id} chat={chat}/>)}
                </ChatList>
            </div>
        )
    }
}

ChatPicker.propTypes = {
    chats:PropTypes.array.isRequired,
    onSelect:PropTypes.func.isRequired,
    activeChat:PropTypes.string
};

export default ChatPicker;