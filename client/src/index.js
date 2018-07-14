import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import AppContainer from './containers/app';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

import {Route, Router, Switch} from "react-router";
import AuthContainer from "./containers/auth";
import history from './history';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./themes/theme";

const store = configureStore();

document.title = process.env.REACT_APP_NAME;

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={AppContainer}/>
                    <Route exact path="/auth" component={AuthContainer}/>
                </Switch>
            </Router>
        </MuiThemeProvider>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
