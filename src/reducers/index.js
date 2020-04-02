import {combineReducers} from "redux";
import rootReducers from "./rootReducers";
import reducersChannel from "./reducersChannel";

export default combineReducers({rootReducers, reducersChannel})