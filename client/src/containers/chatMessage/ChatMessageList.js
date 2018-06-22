import React, {Component} from 'react';
import CSSTransition from "../../components/CSSTransition";

class ChatMessageList extends Component {

    componentDidMount(){
        this.scrollBottom();
    }
    componentDidUpdate(){
        this.scrollBottom();
    }
    scrollBottom(){
        let el = document.getElementById('chatMessageList');
        el.scrollTop = el.scrollHeight;
    };
    render(){
        const {children} = this.props;
        return (
            <div id="chatMessageList" className="chat-body">
                <CSSTransition animation="fade">
                    {children}
                </CSSTransition>
            </div>
        )
    }
}

export default ChatMessageList;