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

const App = ({history}) => {
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                history.push('/')
            }
        })
    }, [history])
    return (

        <Switch>
            <Route exact path="/" component={Dasboard}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
        </Switch>

    );
}

export default App;
