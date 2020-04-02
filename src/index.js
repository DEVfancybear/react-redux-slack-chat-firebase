import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import {withRouter} from "react-router";
import {BrowserRouter as Router} from "react-router-dom";
import {createStore} from "redux";
import rootReducer from "./reducers/index";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import history from './history';

const AppWithAuth = withRouter(App);
const store = createStore(
    rootReducer,
    composeWithDevTools()
);
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <AppWithAuth/>
        </Router>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
