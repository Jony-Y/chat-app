import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularLoader from "./loader/CircularLoader";
import {lightGray} from "../themes/colors";
const offset = 200;

class InfiniteScroll extends Component {
    constructor(props){
        super(props);
        this.state = {currentPage: this.props.initialPage || 0, fetching: false};
        this.scrollRef = React.createRef();
    }

    componentDidMount() {
        this.scrollRef.current.addEventListener('scroll', this.handleScrollEvent);
    }
    componentWillUnmount() {
        this.scrollRef.current.removeEventListener('scroll', this.handleScrollEvent);
    }

    async fetchNextPage(){
        try {
            this.setState(prevState => ({
                currentPage: prevState.currentPage + 1,
                fetching:true
            }));
            await this.props.onLoadMore(this.state.currentPage);
            this.setState({fetching: false});
        } catch (err) {
            this.setState({fetching: false});
        }
    }

    handleScrollEvent = async() => {
        if (!this.fetching && this.props.pageCount > this.state.currentPage) {
            let element = this.scrollRef.current;
            if(this.props.direction === 'up'){
                if (element.scrollTop <= 0) {
                    await this.fetchNextPage();
                }
            }else{
                if (element.scrollHeight - element.scrollTop - element.clientHeight <= offset) {
                    await this.fetchNextPage();
                }
            }

        }
    };

    render(){
        const {className, children, style, direction, id} = this.props;
        const {fetching, currentPage} = this.state;
        return (
            <div id={id} ref={this.scrollRef} className={`flexbox-fill h-fill overflow-y-auto ${className}`} style={style}>
                {direction === 'up' && fetching && currentPage > 0 &&  <CircularLoader size={30} thickness={4} style={{color:lightGray}}/>}
                {children}
                {direction === 'down' && fetching && currentPage > 0 &&  <CircularLoader size={30} thickness={4} style={{color:lightGray}}/>}
            </div>
        )
    }
}
InfiniteScroll.propTypes = {
    children:PropTypes.node,
    className:PropTypes.string,
    style:PropTypes.object,
    initialPage:PropTypes.number,
    onLoadMore:PropTypes.func,
    loader:PropTypes.node,
    pageCount:PropTypes.number,
    id:PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    direction:PropTypes.string.isRequired
};

export default InfiniteScroll;