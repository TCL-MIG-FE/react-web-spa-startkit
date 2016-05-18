import { createAction } from 'redux-actions';
import { CLICK_TEST, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, ADD_RANDOM_USER } from '../constants/actions';
import API from '../utils/api';

export default {
  clickTest: createAction(CLICK_TEST),
  addUser: createAction(ADD_RANDOM_USER),
  getUser: (params) => ({
    types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE],
    payload: {
      users: API.getUser(params),
      username: params.username
    }
  })
};

