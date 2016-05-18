import { handleActions } from 'redux-actions';
import { SUBMIT_CONFIG_REQUEST, SUBMIT_CONFIG_SUCCESS, SUBMIT_CONFIG_FAILURE } from '../constants/actions';

import { merge } from 'lodash';


const initialState = {
  formData: null,
  formResult: null,
  formError: null
};

export default handleActions({
  [SUBMIT_CONFIG_REQUEST]: (state, action) => {
    // do nothing
    return merge({}, state, {
      formData: action.payload.params,
      formResult: null,
      formError: ""
    });
  },
  [SUBMIT_CONFIG_SUCCESS]: (state, action) => {
    return merge({}, state, {
      formResult: action.payload,
      formError: ""
    });
  },
  [SUBMIT_CONFIG_FAILURE]: (state, action) => {
    return merge({}, state, {
      formResult: null,
      formError: action.payload.msg
    });
  }
}, initialState);
