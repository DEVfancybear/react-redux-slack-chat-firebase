import React, {useEffect} from 'react';
import './App.css';
import {
    Switch,
    Route
} from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dasboard from "./components/Dashboard/Dasboard";
import firebase from "./firebase";
import {connect} from "react-redux";
import {setUser, clearUser} from "./actions/index"
import Spinner from "./components/Spinner/Spinner";
import history from './history';

const App = ({setUser, rootReducers: {isLoading}, clearUser}) => {
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                history.push("/")
            } else {
                history.push("/login");
                clearUser();
            }
        })
    }, [setUser, clearUser])
    if (isLoading === true) {
        return <Spinner/>
    }
    return (
        <Switch>
            <Route exact path="/" component={Dasboard}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
        </Switch>
    );
}
const mapStateToProps = state => {
    return {
        rootReducers: state.rootReducers
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
