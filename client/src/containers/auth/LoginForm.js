import React , {Component} from 'react';
import PropTypes from 'prop-types';
import Input from "../../components/inputs/Input";
import RaisedButton from "../../components/buttons/RaisedButton";

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {password:'', email:''};
    }
    login = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.email, this.state.password);
    };

    onInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };
    render(){
        const {email, password} = this.state;
        return (
            <form className="flexbox-fill flex-end-center h-fill" onSubmit={this.login} noValidate>
                <Input placeholder="email" name="email" type="email" value={email} className="sm" onChange={this.onInputChange}/>
                <Input placeholder="password" name="password"  value={password} className="sm m-l-15 m-r-15" type="password" onChange={this.onInputChange}/>
                <RaisedButton type="submit" label="Submit" size="small" color="primary"/>
            </form>
        )
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default LoginForm;