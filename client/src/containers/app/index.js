import React, { Component } from 'react';
import {connect} from 'react-redux';
import {logout, fetchUsers} from '../user/actions';
import {bindActionCreators} from 'redux';
import './app.css';
import ChatContainer from "../chat";
import {getQueryParams, go} from "../../utils/navigationUtility";
import userUtility from '../../utils/userUtility';
import AppBar from "../../components/AppBar";
import AppBarSettings from "./AppBarSettings";
import IconButton from "../../components/buttons/IconButton";
import FaEdit from 'react-icons/lib/fa/edit';
import withDrawer from "../../components/drawer/withDrawer";
import Drawer from "../../components/drawer/Drawer";
import {chats} from "../chat/selectors";
import {fetchUserChats} from '../chat/actions';
import ChatPicker from "../chat/ChatPicker";
import CreateNewChatFormContainer from "../chat/CreateNewChatFormContainer";

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
        this.props.fetchUserChats();
    }

    setActiveChat = (chatID) => {
        this.setState({activeChat:chatID});
        go('/',{chat:chatID});
    };

    handleNewChat = (chatID) => {
      this.props.closeDrawer();
      this.setActiveChat(chatID)
    };
    render() {
        const {logout, chats, toggleDrawer, isDrawerOpen, closeDrawer} = this.props;
        const {activeChat} = this.state;
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
                      <CreateNewChatFormContainer onCreate={this.handleNewChat}/>
                  </Drawer>
                  <ChatPicker activeChat={activeChat} chats={chats} onSelect={this.setActiveChat}/>
              </div>
              <ChatContainer/>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {chats: chats(state.chat)}
};

const mapDispatchToProps = (dispatch) => ({
   logout:bindActionCreators(logout, dispatch),
   fetchUsers: bindActionCreators(fetchUsers, dispatch),
   fetchUserChats: bindActionCreators(fetchUserChats, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withDrawer(AppContainer));
