import React, {Component} from 'react';
import PropTypes from  'prop-types';
import Input from "../../components/inputs/Input";
import MdSend from 'react-icons/lib/md/send';
import IconButton from "../../components/buttons/IconButton";

class NewMessageForm extends Component {
    constructor(props){
        super(props);
        this.state = {message:''};
    }
    submit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.message);
        this.setState({message:''})
    };

    setMessage = (e) => {
      this.setState({message:e.target.value});
    };

    render(){
        const {message} = this.state;
        const {onFocus} = this.props;
        return(
            <form noValidate onSubmit={this.submit} className="flexbox-fill chat-bottom-bar flex-center">
                <Input autoFocus={true} onFocus={onFocus} onChange={this.setMessage} className="w-fill" placeholder="Type message here..." value={message}/>
                <IconButton containerClass="p-l-15" onClick={this.submit}><MdSend style={{fontSize:30}}/></IconButton>
            </form>
        )
    }
}

NewMessageForm.propTypes = {
    onSubmit:PropTypes.func.isRequired,
    onFocus:PropTypes.func.isRequired
};

export default NewMessageForm;