import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuItem from "../../components/menu/MenuItem";

class ChatListItem extends Component {

    handleItemClick = (e) => {
        this.props.onClick(this.props.chat.id);
    };

    render(){
        const {chat, isSelected} = this.props;
        return(
            <MenuItem separator onClick={this.handleItemClick} selected={isSelected}>{chat.name}</MenuItem>
        )
    }
}

ChatListItem.propTypes = {
    onClick:PropTypes.func.isRequired,
    chat:PropTypes.object.isRequired,
    isSelected:PropTypes.bool
};
export default ChatListItem;