import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularLoader from "./loader/CircularLoader";
const offset = 200;

@observer
class InfiniteScroll extends Component {
    constructor(props){
        super(props);
        this.state = {currentPage: this.props.initialPage || 0, fetching: false};
        this.container = React.createRef();
    }

    componentDidMount() {
        this.container.addEventListener('scroll', this.handleScrollEvent);
    }
    componentWillUnmount() {
        this.container.removeEventListener('scroll', this.handleScrollEvent);
    }

    handleScrollEvent = async() => {
        if (!this.fetching && this.props.pageCount > this.currentPage) {
            let element = this.container;
            if (element.scrollHeight - element.scrollTop - element.clientHeight <= offset) {
                try {
                    this.setState({fetching: true});
                    await this.props.onLoadMore(++this.currentPage);
                    this.setState({fetching: false});
                } catch (err) {
                    this.setState({fetching: false});
                }
            }
        }
    };

    render(){
        const {className, children, style, direction} = this.props;
        const {fetching, currentPage} = this.state;
        return (
            <div ref={this.container} className={`flexbox-fill h-fill overflow-y-auto ${className}`} style={style}>
                {direction === 'up' && fetching && currentPage > 0 &&  <CircularLoader containerStyle={{width: "100%"}}/>}
                {children}
                {direction === 'down' && fetching && currentPage > 0 &&  <CircularLoader containerStyle={{width: "100%"}}/>}
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
    direction:PropTypes.string.isRequired
};

export default InfiniteScroll;