import { handleActions } from 'redux-actions';
import { CLICK_TEST, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, ADD_RANDOM_USER } from '../constants/actions';
import { merge, union } from 'lodash';

const initialState = {
  text: 'Hallo!~~~!!!',
  clickCnt: 0,
  a: {b:1, c:2},
  users: []
};

export default handleActions({
  [CLICK_TEST]: (state, action) => {
    return merge({}, state, {
      clickCnt: state.clickCnt + 1
    });
  },
  [GET_USER_REQUEST]: (state, action) => {
    return merge({}, state, {
      text: initialState.text + ' load_user pending...',
      clickCnt: state.clickCnt + 1,
      a: {c: 456}
    });
  },
  [GET_USER_SUCCESS]: (state, action) => {
    var x = merge({}, state, {
      text: initialState.text + ' load_user success'
    });
    x.users = action.payload.users; // replace array
    return x;
  },
  [GET_USER_FAILURE]: (state, action) => {
    return merge({}, state, {
      text: initialState.text + ' load_user failed',
      users: []
    });
  },
  [ADD_RANDOM_USER]: (state, action) => {
    return merge({}, state, {
      clickCnt: state.clickCnt + 1,
      users: union(state.users, [Date.now()]) // union array
    });
  }
}, initialState);

