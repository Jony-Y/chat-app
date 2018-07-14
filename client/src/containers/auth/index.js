import React , {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginUser, signUpUser} from './actions';
import AppBar from "../../components/AppBar";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import {go} from "../../utils/navigationUtility";
import userUtility from "../../utils/userUtility";
import './auth.css';

class AuthContainer extends Component {

    componentDidMount(){
        if(userUtility.isLoggedIn){
            go('/');
        }
    }
    render(){
        const {login, signUp} = this.props;
        return (
            <div className="flexbox-fill h-fill flex-column">
                <AppBar color="default"><div className="flex-end m-r-40"><LoginForm onSubmit={login}/></div></AppBar>
                <div className="relative h-fill flex-center">
                    <SignUpForm onSubmit={signUp}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: bindActionCreators(loginUser, dispatch),
    signUp: bindActionCreators(signUpUser, dispatch)
});

export default connect(null, mapDispatchToProps)(AuthContainer);