import React , {Component} from 'react';
import PropTypes from 'prop-types';
import Input from "../../components/inputs/Input";
import RaisedButton from "../../components/buttons/RaisedButton";
import Form from "../../components/form/Form";
import FormGroup from "../../components/form/FormGroup";
import {PASSWORD_REGEX} from "../../constants/constants";

class SignUpForm extends Component {
    constructor(props){
        super(props);
        this.state = {email:'', password:'', firstName:'', lastName:''};
    }

    signUp = (e) => {
        this.props.onSubmit(this.state);
    };

    handleInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]:value});
    };

    render(){
        const {email, password, firstName, lastName} = this.state;
        return (
            <Form className="flexbox-fill h-fill flex-column flex-center" onSubmit={this.signUp}>
                <div className="sign-up-body">
                    <div className="font-b-26 m-b-20">Sign Up</div>
                    <FormGroup>
                        <Input required={true} name="firstName" placeholder="First Name" onChange={this.handleInputChange} className=" form-control w-fill" value={firstName}/>
                    </FormGroup>
                    <FormGroup>
                        <Input required={true} name="lastName" placeholder="Last Name" onChange={this.handleInputChange} className="form-control w-fill" value={lastName}/>
                    </FormGroup>
                    <FormGroup>
                        <Input required={true} name="email" placeholder="Email" type="email" onChange={this.handleInputChange} className="form-control w-fill" value={email}/>
                    </FormGroup>
                    <FormGroup>
                        <Input required={true} minLength={6} pattern={PASSWORD_REGEX} name="password" placeholder="Password" type="password" onChange={this.handleInputChange} className="form-control w-fill" value={password}/>
                    </FormGroup>

                    <RaisedButton label="Submit" color="primary" containerClass="flexbox-fill flex-end m-t-20" type="submit"/>
                </div>
            </Form>
        )
    }
}

SignUpForm.propTypes = {
    onSubmit:PropTypes.func.isRequired
};

export default SignUpForm;