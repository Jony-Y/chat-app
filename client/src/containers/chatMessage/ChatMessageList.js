import React, {Component} from 'react';
import CSSTransition from "../../components/CSSTransition";
import InfiniteScroll from "../../components/InfiniteScroll";

class ChatMessageList extends Component {
    render(){
        const {children, onFetchNext, pageCount, id} = this.props;
        return (
            <InfiniteScroll pageCount={pageCount} onLoadMore={onFetchNext} direction="up" className="chat-body" id={id} initialPage={0}>
                <CSSTransition animation="fade">
                    {children}
                </CSSTransition>
            </InfiniteScroll>
        )
    }
}

export default ChatMessageList;