import {handleActions} from "redux-actions";
import {SHOW_PAGE_LOADING, HIDE_PAGE_LOADING, GET_CURRENT_USER, CHANGE_DEFAULT_APP} from "../constants/actions";

const initialState = {
	pageLoading: false,
	user: {
		email: 'anonymous@tcl.com'
	},
	defaultApp: {}
};
export default handleActions({
	
	[SHOW_PAGE_LOADING]: (state, action) => Object.assign({}, state, {pageLoading: true}),

	[HIDE_PAGE_LOADING]: (state, action) => Object.assign({}, state, {pageLoading: false}),

	[GET_CURRENT_USER]: (state, action) => {
		var user = window.config && window.config.currentUser;
		return user ? Object.assign({}, state, {user: {email: window.config.currentUser}}) : state;
	},
	
	[CHANGE_DEFAULT_APP]: (state, action)=> {
		return Object.assign({}, state, {defaultApp: action.payload})
	}

}, initialState);