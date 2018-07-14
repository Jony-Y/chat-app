import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

class ProgressBar extends Component{
    constructor(props){
        super(props);
        this.state={completed:0};
    }
    componentDidMount(){
        this.timer = setInterval(()=>{this.progress(this.props.value*7/100)},100)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.value !== this.props.value){
            setTimeout(()=>{
                clearTimeout(this.timer);
                this.timer = setInterval(()=>{this.progress(this.props.value*7/100)},100)
            },0)
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    progress = (leap)=>{
        if (this.state.completed >= this.props.value) {
            this.setState({completed: this.props.value});
            clearTimeout(this.timer);
        } else {
            this.setState({completed: this.state.completed+leap});
        }
    };

    render(){
        const {completed} = this.state;
        const {containerStyle, containerClass, color, max, min, mode, progressStyle} = this.props;
        return(
            <div style={containerStyle} className={`flexbox-fill ${containerClass}`}>
                <LinearProgress color={color}  max={max} min={min} variant={mode} value={completed} style={progressStyle}/>
            </div>
        );
    }
}


ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    min:PropTypes.number,
    max:PropTypes.number,
    containerStyle:PropTypes.object,
    containerClass:PropTypes.string,
    progressStyle:PropTypes.object,
    color:PropTypes.string,
    mode:PropTypes.string
};
export default ProgressBar;