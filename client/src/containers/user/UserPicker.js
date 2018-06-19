import React , {Component} from 'react';
import PropTypes from 'prop-types';
import './user.scss';
import SearchFilterBar from "../../components/inputs/SearchFilterBar";
import SearchFilter from "../../components/inputs/SearchFilter";
import UserList from "./UserList";
import UserListItem from "./UserListItem";
import VerticalDivider from "../../components/VerticalDivder";

class UserPicker extends Component {
    constructor(props){
        super(props);
        this.state = {selectedUsers:new Set(), filteredUsers:props.users ||  []};
    }

    selectUser = (userID) => {
        if(this.state.selectedUsers.has(userID)){
            this.setState(({ selectedUsers }) => {
                selectedUsers.delete(userID);
                return {selectedUsers: new Set(selectedUsers)}
            });

        }else{
            this.setState(({ selectedUsers }) => ({
                selectedUsers: new Set(selectedUsers.add(userID))
            }));
        }
    };

    filterUsers = (filter) => {
        this.setState({filteredUsers: this.props.users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()))});
    };

    render(){
        const {selectedUsers, filteredUsers} = this.state;
        return (
            <div className="user-picker-container">
                <SearchFilterBar>
                    <SearchFilter onFilter={this.filterUsers}/>
                </SearchFilterBar>
                <VerticalDivider className="m-t-5"/>
                <UserList>
                    {filteredUsers.map(user => <UserListItem key={user.id} onClick={this.selectUser}
                                                     isSelected={selectedUsers.has(user.id)} user={user}/>)}
                </UserList>
            </div>
        )
    }
}

UserPicker.propTypes = {
    users:PropTypes.array.isRequired,
    onClick:PropTypes.func.isRequired
};

export default UserPicker;