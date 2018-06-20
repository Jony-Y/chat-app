import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuItem from "../../components/menu/MenuItem";
import Checkbox from "@material-ui/core//Checkbox/Checkbox";

class UserListItem extends Component {

    handleItemClick = (e) => {
        this.props.onClick(this.props.user.id);
    };

    render(){
        const {user, isSelected} = this.props;
        return(
            <MenuItem separator style={{paddingLeft:0}} onClick={this.handleItemClick} selected={isSelected}>
                <Checkbox color="primary" checked={isSelected} onChange={this.handleItemClick}/> <div>{user.name}</div>
            </MenuItem>
        )
    }
}

UserListItem.propTypes = {
    onClick:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    isSelected:PropTypes.bool
};
export default UserListItem;