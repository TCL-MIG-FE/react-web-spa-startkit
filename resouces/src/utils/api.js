import "es6-promise";
import "whatwg-fetch";
import {message} from "antd";
import qs from "querystring";
import isEmpty from "lodash.isempty";
import * as API from "../constants/api";

const METHODS = {
	GET: 'get',
	POST: 'post',
	PUT: 'put',
	DELETE: 'delete'
};

const request = (url, params, method = METHODS.GET, jsonType = false) => {
	var options = {
		headers: {
			'Content-Type': jsonType ? 'application/json' : 'application/x-www-form-urlencoded'
		},
		method: method,
		credentials: 'include'
	};
	if (method !== METHODS.GET && !isEmpty(params)) {
		options.body = jsonType ? JSON.stringify(params) : qs.stringify(params)
	} else if (method === METHODS.GET && !isEmpty(params)) {
		url += ('?' + qs.stringify(params));
	}
	return fetch(url, options).then(checkRespStatus);
};

const post = (url, params) => request(url, params, METHODS.POST, true);

// check resp status
const checkRespStatus = (respPromise) => {
	if (respPromise.status !== 200) {
		return Promise.reject('Server error occurred');
	}
	return respPromise.json().then(resp => {
		return new Promise((resolve, reject) => {
			if (resp && resp.code == API.CODE_SUCCESS) {
				resolve(resp.data);
			} else if (typeof(resp) === 'string' && resp.indexOf('InvalidSession') > -1) {
				window.location.reload();
			} else {
				resp.msg && message.error(resp.msg);
				reject(resp);
			}
		});
	});
};

export default {

	// 获取所用的应用列表
	getApps: () => request(API.GET_APPS),

	// 获取所有的应用概要列表
	getAppsSummary: appId=> request(API.GET_APPS_SUMMARY, {appId}),

	createApp: app => post(API.CREATE_APP, app),
	getAgents: ()=>request(API.GET_AGENTS),
	createAgent: agent => post(API.CREATE_AGENT, agent),
	getSources: ()=>request(API.GET_SOURCES),
	createSource: source => post(API.CREATE_SOURCE, source),

	// 获取NON-GP的渠道列表信息，用于渠道管理
	queryChannels: (appId, params) => request(API.QUERY_CHANNELS.replace(':appId', appId), params),

	// 获取渠道列表信息，包含新增，环比等等
	queryChannelsSummary: params => request(API.QUERY_CHANNELS_SUMMARY, params),

	// 获取所有渠道列表的详细信息，也就是渠道统统信息以生成折线图表
	queryChannelsChartStatistics: params => request(API.QUERY_CHANNELS_CHART_STATISTICS, params),

	// 获取所有渠道的表格详细信息
	queryChannelsTableStatistics: params => request(API.QUERY_CHANNELS_TABLE_STATISTICS, params),

	// 获取某个特定渠道的详细信息，也就是渠道统统信息以生成堆积图表
	queryChannelChartStatistics: params => request(API.QUERY_CHANNEL_CHART_STATISTICS, params),

	// 获取某个特定渠道的表格详细信息
	queryChannelTableStatistics: params => request(API.QUERY_CHANNEL_TABLE_STATISTICS, params),

	// 获取所有渠道的表格信息,包含1日，3日，7日以及30日以后的留存数据
	queryChannelsRetention: params => request(API.QUERY_CHANNELS_RETENTION, params),


	// 获取渠道查询的时间列表
	queryTimeDurations: ()=>request(API.QUERY_TIMEDURATIONS),
	
	// 获取渠道的地域信息
	queryCountries: ()=>request(API.QUERY_COUNTRIES),

	createChannel: channel => post(API.CREATE_CHANNEL, channel),
	updateChannel: channel => post(API.UPDATE_CHANNEL, channel),
};

