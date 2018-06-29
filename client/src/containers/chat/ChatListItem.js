import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuItem from "../../components/menu/MenuItem";
import Badge from "../../components/Badge";

class ChatListItem extends Component {

    handleItemClick = (e) => {
        this.props.onClick(this.props.chat.id);
    };

    render(){
        const {chat, isSelected} = this.props;
        return(
            <MenuItem separator onClick={this.handleItemClick} selected={isSelected}>
                <div className="flexbox-fill flex-space-between">
                    <div className="flex-center-start">{chat.name}</div>
                    {chat.unreadCount > 0 && <Badge value={chat.unreadCount}/>}
                </div>
            </MenuItem>
        )
    }
}

ChatListItem.propTypes = {
    onClick:PropTypes.func.isRequired,
    chat:PropTypes.object.isRequired,
    isSelected:PropTypes.bool
};
export default ChatListItem;