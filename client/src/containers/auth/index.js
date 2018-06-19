import React , {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loginUser} from './actions';
import AppBar from "../../components/AppBar";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import {go} from "../../utils/navigationUtility";
import userUtility from "../../utils/userUtility";

class AuthContainer extends Component {

    componentDidMount(){
        if(userUtility.isLoggedIn){
            go('/');
        }
    }
    render(){
        const {login} = this.props;
        return (
            <div className="flexbox-fill h-fill flex-column">
                <AppBar color="default"><div className="flex-end"><LoginForm onSubmit={login}/></div></AppBar>
                <div className="relative top-60 flex-center">
                    <SignUpForm/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: bindActionCreators(loginUser, dispatch)
});

export default connect(null, mapDispatchToProps)(AuthContainer);