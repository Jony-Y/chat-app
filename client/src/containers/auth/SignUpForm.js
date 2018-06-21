import React , {Component} from 'react';
import PropTypes from 'prop-types';
import Input from "../../components/inputs/Input";
import RaisedButton from "../../components/buttons/RaisedButton";

class SignUpForm extends Component {
    constructor(props){
        super(props);
        this.state = {email:'', password:'', firstName:'', lastName:''};
    }

    signUp = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state);
    };

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]:value});
    };

    render(){
        const {email, password, firstName, lastName} = this.state;
        return (
            <form className="flexbox-fill h-fill flex-column flex-center" onSubmit={this.signUp}>
                <div className="sign-up-body">
                    <div className="font-b-26 m-b-20">Sign Up</div>
                    <Input name="firstName" placeholder="First Name" onChange={this.handleInputChange} className="w-fill m-b-15" value={firstName}/>
                    <Input name="lastName" placeholder="Last Name" onChange={this.handleInputChange} className="w-fill m-b-15" value={lastName}/>
                    <Input name="email" placeholder="Email" type="email" onChange={this.handleInputChange} className="w-fill m-b-15" value={email}/>
                    <Input name="password" placeholder="Password" type="password" onChange={this.handleInputChange} className="w-fill m-b-15" value={password}/>
                    <RaisedButton label="Submit" color="primary" containerClass="flexbox-fill flex-end m-t-20" type="submit"/>
                </div>
            </form>
        )
    }
}

SignUpForm.propTypes = {
    onSubmit:PropTypes.func.isRequired
};

export default SignUpForm;