import {createAction} from "redux-actions";
import {SHOW_PAGE_LOADING, HIDE_PAGE_LOADING, GET_CURRENT_USER, CHANGE_DEFAULT_APP} from "../constants/actions";


export default {
	
	showPageLoading: createAction(SHOW_PAGE_LOADING),
	hidePageLoading: createAction(HIDE_PAGE_LOADING),
	
	getCurrentUser: createAction(GET_CURRENT_USER),

	changeDefaultApp: createAction(CHANGE_DEFAULT_APP, appId => Promise.resolve(appId))
}