import {combineReducers} from "redux";
import rootReducers from "./rootReducers";
import reducersChannel from "./reducersChannel";
import reducersColors from "./reducersColors";

export default combineReducers({rootReducers, reducersChannel, reducersColors})