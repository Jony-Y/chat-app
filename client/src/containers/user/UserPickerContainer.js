import React , {Component} from 'react';
import PropTypes from 'prop-types';
import './user.scss';
import SearchFilterBar from "../../components/inputs/SearchFilterBar";
import SearchFilter from "../../components/inputs/SearchFilter";
import UserList from "./UserList";
import UserListItem from "./UserListItem";
import VerticalDivider from "../../components/VerticalDivder";
import {users} from "./selectors";
import {connect} from "react-redux";

class UserPickerContainer extends Component {
    constructor(props){
        super(props);
        this.state = {selectedUsers:new Set(), filteredUsers:props.users ||  []};
    }

    selectUser = (userID) => {
        let selectedUsers = this.state.selectedUsers;
        if(selectedUsers.has(userID)){
            selectedUsers.delete(userID);
        }else{
            selectedUsers.add(userID);
        }
        this.setState({selectedUsers:selectedUsers});
        this.props.onClick(Array.from(selectedUsers.values()));
    };

    filterUsers = (filter) => {
        this.setState({filteredUsers: this.props.users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()))});
    };

    render(){
        const {selectedUsers, filteredUsers} = this.state;
        return (
            <div className="user-picker-container">
                <SearchFilterBar>
                    <SearchFilter onChange={this.filterUsers}/>
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

UserPickerContainer.propTypes = {
    onClick:PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        users: users(state.user)
    }
};


export default connect(mapStateToProps, null) (UserPickerContainer);