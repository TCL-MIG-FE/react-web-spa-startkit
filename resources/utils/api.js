// require('es6-promise');
// require('whatwg-fetch');

import qs from 'querystring';
import * as API from '../constants/api';
import { delay } from './common';

const METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};

const request = (url, params, method = 'post', jsonType = true) => {
  var options = {
    headers: {
      'Content-Type': jsonType ? 'application/json' : 'application/x-www-form-urlencoded'
    },
    method: method,
    credentials: 'include'
  };
  if(method !== METHOD.GET && params) {
    options.body = jsonType ? JSON.stringify(params) : qs.stringify(params)
  }
  if(method === METHOD.GET && params) {
    url += ('?' + qs.stringify(params));
  }
  return fetch(url, options).then(checkRespStatus);
};

// check resp status
const checkRespStatus = (respPromise) => {
  if(respPromise.status !== 200) {
    console.log('Server error occurred');
    return Promise.reject();
  }
  return respPromise.json().then(resp => {
    return new Promise((resolve, reject) => {
      if(resp && resp.code === API.CODE_SUCCESS) {
        resolve(resp.data);
      } else {
        // resp.msg && alert(resp.msg);
        reject(resp);
      }
    });
  });
};

export default {
  getUser: (params) => request(API.GET_USER, params, METHOD.GET),
  saveConfig: (params) => request(API.SAVE_CONFIG, params, METHOD.PUT),
  getChartData: (params) => request(API.GET_CHART_DATA, params, METHOD.POST)
};

