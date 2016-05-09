import { createAction } from 'redux-actions';
import { SUBMIT_CONFIG_FORM, SUBMIT_CONFIG_REQUEST, SUBMIT_CONFIG_SUCCESS, SUBMIT_CONFIG_FAILURE } from '../constants/actions';
import API from '../utils/api';

export default {
  submitConfig: (params) => ({
    types: [SUBMIT_CONFIG_REQUEST, SUBMIT_CONFIG_SUCCESS, SUBMIT_CONFIG_FAILURE],
    payload: {
      result: API.saveConfig(params),
      params: params
    }
  })
};