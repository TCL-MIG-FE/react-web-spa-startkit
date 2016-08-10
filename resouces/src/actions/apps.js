import {GET_APPS, GET_APPS_SUMMARY, CREATE_APP} from "../constants/api";
import {createAction} from "redux-actions";
import Api from "../utils/api";

export default {

	getApps: createAction(GET_APPS, Api.getApps),

	getAppsSummary: createAction(GET_APPS_SUMMARY, Api.getAppsSummary),
	
	createApp: createAction(CREATE_APP, Api.createApp)
};