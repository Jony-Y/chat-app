import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {newMessageSuccess} from "./actions";
/**
 * Create a wrapper composition to support chat message connect
 * @param ComposedComponent
 * @returns {{Component}}
 */


function withChatMessage (ComposedComponent) {
    class ChatMessageWrapper extends Component {
        render(){
            return <ComposedComponent {...this.props}/>;
        }
    }
    const mapDispatchToProps = (dispatch) => ({
        newMessageSuccess:bindActionCreators(newMessageSuccess, dispatch)
    });

    return connect(null, mapDispatchToProps)(ChatMessageWrapper);

}

export default withChatMessage;
