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
import {setUser} from "./actions/index"

const App = ({history, setUser}) => {
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                history.push('/')
            }
        })
    }, [history, setUser])
    return (

        <Switch>
            <Route exact path="/" component={Dasboard}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
        </Switch>

    );
}

const mapDisPatchToProps = (dispatch, props) => {
    return {
        setUser: user => {
            dispatch(setUser((user)))
        }
    }
}
export default connect(null, mapDisPatchToProps)(App);
