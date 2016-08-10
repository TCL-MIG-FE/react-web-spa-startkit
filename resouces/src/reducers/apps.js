import {handleActions} from "redux-actions";
import {GET_APPS, GET_APPS_SUMMARY} from "../constants/api";
import merge from "lodash.merge";


const initialState = {
	
	appsList: [],

	appsSummary: [],
};

export default handleActions({

	[GET_APPS]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			appsList: action.payload
		}) : state;
	},

	[GET_APPS_SUMMARY]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			appsSummary: action.payload
		}) : state;
	}
}, initialState);
