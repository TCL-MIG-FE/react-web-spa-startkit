import {routeReducer} from "react-router-redux";
import {combineReducers} from "redux";
import apps from "./apps";
import channels from "./channels";
import root from "./root";

export default combineReducers({
	routeReducer, // react router
	apps,
	channels,
	root,
})
