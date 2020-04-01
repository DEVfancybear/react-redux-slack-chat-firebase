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
import Spinner from "./Spinner/Spinner";

const App = ({history, setUser, rootReducers: {isLoading}}) => {
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                history.push('/')
            }
        })
    }, [history, setUser])
    if (isLoading === true) {
        return <Spinner/>
    }
    return (
        <Switch>
            <Route exact path="/" component={Dasboard}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
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
            dispatch(setUser((user)))
        }
    }
}
export default connect(mapStateToProps, mapDisPatchToProps)(App);
