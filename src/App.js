import React, {Component} from 'react';
import './App.css';
import {
    Switch,
    Route
} from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dasboard";
import firebase from "./firebase";
import {connect} from "react-redux";
import {setUser, clearUser} from "./actions/index"
import Spinner from "./components/Spinner/Spinner";

class App extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // console.log(user);
                this.props.setUser(user);
                this.props.history.push("/");
            } else {
                this.props.history.push("/login");
                this.props.clearUser();
            }
        });
    }

    render() {
        return this.props.isLoading ? (
            <Spinner />
        ) : (
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Switch>
        );
    }
}
const mapStateToProps = state => {
    return {
        isLoading: state.rootReducers.isLoading
    }
}
const mapDisPatchToProps = (dispatch, props) => {
    return {
        setUser: user => {
            dispatch(setUser(user))
        },
        clearUser: () => {
            dispatch(clearUser())
        }
    }
}
export default connect(mapStateToProps, mapDisPatchToProps)(App);
