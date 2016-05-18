import { createAction } from 'redux-actions';
import { GET_CHART_DATA_REQUEST, GET_CHART_DATA_SUCCESS, GET_CHART_DATA_FAILURE } from '../constants/actions';
import API from '../utils/api';

export default {
  getChartData: (params) => ({
    types: [GET_CHART_DATA_REQUEST, GET_CHART_DATA_SUCCESS, GET_CHART_DATA_FAILURE],
    payload: {
      result: API.getChartData(params)
    }
  })
};

