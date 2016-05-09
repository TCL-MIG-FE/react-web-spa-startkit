import { handleActions } from 'redux-actions';
import { GET_CHART_DATA_REQUEST, GET_CHART_DATA_SUCCESS } from '../constants/actions';

import { merge } from 'lodash';


const initialState = {
  chartData: {}
};

export default handleActions({
  [GET_CHART_DATA_REQUEST]: (state, action) => {
    return merge({}, state, {
      chartData: {}
    });
  },
  [GET_CHART_DATA_SUCCESS]: (state, action) => {
    return merge({}, state, {
      chartData: action.payload.result
    });
  }
}, initialState);
