import React, { Component } from 'react';
import {connect} from 'react-redux';
import {logout, fetchUsers} from '../user/actions';
import {bindActionCreators} from 'redux';
import './app.css';
import ChatList from "../chat/ChatList";
import ChatContainer from "../chat";
import {getQueryParams, go} from "../../utils/navigationUtility";
import userUtility from '../../utils/userUtility';
import AppBar from "../../components/AppBar";
import {users} from "../user/selectors";
import AppBarSettings from "./AppBarSettings";
import IconButton from "../../components/buttons/IconButton";
import FaEdit from 'react-icons/lib/fa/edit';
import withDrawer from "../../components/drawer/withDrawer";
import Drawer from "../../components/drawer/Drawer";
import UserPicker from "../user/UserPicker";

class AppContainer extends Component {

    constructor(props){
        super(props);
        this.state = {activeChat: getQueryParams().chat || null};
    }
    componentDidMount(){
        if(!userUtility.isLoggedIn){
            go('/auth');
        }
        this.props.fetchUsers();
    }

    setActiveChat = (chatID) => {
        this.setState({activeChat:chatID});
        go('/',{chat:chatID});
    };

    render() {
        const {logout, users, toggleDrawer, isDrawerOpen, closeDrawer} = this.props;
        return (
          <div className="app-container flexbox-fill">
              <div className="flexbox-fill h-fill flex-column w-300">
                  <AppBar color="default" style={{paddingRight:10}}>
                      <div className="flex-end">
                          <IconButton onClick={toggleDrawer} tooltip="New Chat" className="icon-btn-sm"><FaEdit style={{fontSize:20}}/></IconButton>
                          <AppBarSettings onLogout={logout}/>
                      </div>
                  </AppBar>
                  <Drawer open={isDrawerOpen} header="Select Users" bodyClass="bg-lightest-gray" onClose={closeDrawer}>
                      <UserPicker users={users} onClick={this.setActiveChat}/>
                  </Drawer>
                  <ChatList users={users} onClick={this.setActiveChat}/>
              </div>
              <ChatContainer/>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: users(state.user)
    }
};

const mapDispatchToProps = (dispatch) => ({
   logout:bindActionCreators(logout, dispatch),
   fetchUsers: bindActionCreators(fetchUsers, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withDrawer(AppContainer));
