import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dasboard from "./components/Dashboard/Dasboard";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Dasboard}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
            </Switch>
        </Router>
    );
}

export default App;
