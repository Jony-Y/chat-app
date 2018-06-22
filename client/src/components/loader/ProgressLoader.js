import React ,{Component}from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import CSSTransition from '../CSSTransition';
import {secondary} from '../../themes/colors';

class ProgressLoader extends Component {
    constructor(props){
        super(props);
        this.state = {complete:0, show:false};
        this.timer = 0;
    }

    componentDidMount(){
        if(this.props.show){
            this.reset();
        }
    }
    
   componentWillUpdate(nextProps){
        if(nextProps.progress !== this.props.progress){
            this.setProgress(nextProps.progress);
        }
        if(!nextProps.show && this.props.show){
            this.hide();
        }else if(!this.props.show && nextProps.show){
            this.reset();
        }
    }

    componentWillUnmount() {
        this.stop()
    }
    hideLoader = () => {
        this.setState({show: false});
    };
    setProgress = (progress) => {
        this.setState({complete: progress});
    };
    reset = () => {
        this.setState({complete:0, show:false});
        this.start();
    };
    hide = () => {
        this.setState({complete:100});
        this.stop();
        setTimeout(()=>this.hideLoader(),600);
    };
    start = ()=>{
        this.timer = setInterval(() => this.progress(1), 300);
    };

    stop=()=>{
        if(this.timer){
            clearTimeout(this.timer);
        }
    };

   @action progress(leap) {
        if (this.state.complete === 96) {
            this.stop();
        } else {
            this.setState(prevState => ({
                completed: prevState.completed + leap
            }));

        }
   }

    render(){
       const {style, className, color, progressStyle} = this.props;
       const {show, completed} = this.state;
        return(
            <div style={style} className={`flexbox-fill ${className}`}>
                <CSSTransition animation="fade-quick" className="flexbox-fill">
                    {show && <LinearProgress key={1} style={progressStyle || {height:'4px'}} variant="determinate" value={completed} color={color || secondary}/>}
                </CSSTransition>
            </div>
        );
    }
}

ProgressLoader.propTypes = {
    show:PropTypes.bool.isRequired,
    color:PropTypes.string,
    style:PropTypes.object,
    className:PropTypes.string,
    progressStyle:PropTypes.object,
    progress:PropTypes.number
};
export default ProgressLoader;