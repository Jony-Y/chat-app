import React , {Component} from 'react';
import PropTypes from 'prop-types';
import UserPickerContainer from "../user/UserPickerContainer";
import Input from "../../components/inputs/Input";
import MdArrowForward from "react-icons/lib/md/arrow-forward";
import {white} from "../../themes/colors";
import {bindActionCreators} from "redux";
import {createChat} from "./actions";
import {connect} from "react-redux";
import CreateChatBottomBar from "./CreateChatBottomBar";
import isEmpty from "lodash/isEmpty";
import FabButton from "../../components/buttons/FabButton";

class CreateNewChatFormContainer extends Component {
    constructor(props){
        super(props);
        this.state = {participants: [], name:''};
    }

    setParticipants = (participants) => {
        this.setState({participants:participants});
    };

    setName = (e) => {
        this.setState({name:e.target.value});
    };

    createChat = async(e) => {
        e.preventDefault();
        const chat = await this.props.createChat(this.state);
        this.props.onCreate(chat.id);
    };

    render(){
        const {name, participants} = this.state;
        return (
            <form noValidate className="flexbox-fill flex-column" onSubmit={this.createChat}>
                <UserPickerContainer onClick={this.setParticipants}/>
                <CreateChatBottomBar show={!isEmpty(participants)}>
                    {participants.length > 1 && <Input onChange={this.setName} className="m-r-15 new-chat-input" value={name} placeholder="Group name"/>}
                        <FabButton disabled={participants.length > 1 && isEmpty(name)} color="primary" type="submit" tooltip="Save Group">
                            <MdArrowForward style={{fontSize:30, color:white}}/>
                        </FabButton>
                </CreateChatBottomBar>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    createChat: bindActionCreators(createChat, dispatch)
});

CreateNewChatFormContainer.propTypes = {
  onCreate:PropTypes.func
};
export default connect(null, mapDispatchToProps)(CreateNewChatFormContainer);