import {handleActions} from "redux-actions";
import {
	QUERY_CHANNELS,
	QUERY_CHANNELS_SUMMARY,
	QUERY_CHANNELS_CHART_STATISTICS,
	QUERY_CHANNELS_TABLE_STATISTICS,
	QUERY_CHANNEL_CHART_STATISTICS,
	QUERY_CHANNEL_TABLE_STATISTICS,
	QUERY_CHANNELS_RETENTION,
	QUERY_TIMEDURATIONS,
	QUERY_COUNTRIES,
	GET_AGENTS,
	GET_SOURCES
} from "../constants/api";


const initialState = {
	
	channelsList: [],
	
	// 渠道类表，包含昨日新增，日环比等等
	channelsSummaryList: [],
	
	//所有渠道留存
	channelsRetentionList: [],

	// 某个特定渠道的详细统计信息，用于生成堆积图表
	channelChartStatistics: {},
	
	// 所有渠道表格留存信息
	channelsTableStatistics: [],
	
	// 某个特定渠道的详细统计信息，用于生成堆积图表
	channelChartStatistics: {},
	
	//某个特定渠道表格留存信息
	channelTableStatistics: [],


	// 时间搜索列表
	timeDurations:[],
	
	// 地域国家类表
	countryList: [],
	
	agentsList: [],
	
	sourcesList: [],
	
};

export default handleActions({
	
	[QUERY_CHANNELS]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			channelsList: action.payload
		}) : state;
	},
	
	[QUERY_CHANNELS_SUMMARY]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			channelsSummaryList: action.payload
		}) : state;
	},
	
	[QUERY_CHANNELS_CHART_STATISTICS]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			channelsChartStatistics: action.payload
		}) : state;
	},
	
	[QUERY_CHANNELS_TABLE_STATISTICS]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			channelsTableStatistics: action.payload
		}) : state;
	},
	
	[QUERY_CHANNEL_CHART_STATISTICS]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			channelChartStatistics: action.payload
		}) : state;
	},
	
	[`${QUERY_CHANNEL_TABLE_STATISTICS}_NEW`]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			channelTableStatistics: action.payload
		}) : state;
	},
	
	[QUERY_CHANNELS_RETENTION]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			channelsRetentionList: action.payload
		}) : state;
	},

	[QUERY_TIMEDURATIONS]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			timeDurations: action.payload
		}) : state;
	},
	
	
	[QUERY_COUNTRIES]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			countryList: action.payload
		}) : state;
	},
	
	[GET_AGENTS]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			agentsList: action.payload
		}) : state;
	},
	[GET_SOURCES]: (state, action) => {
		let error = action.error;
		return !error ? Object.assign({}, state, {
			sourcesList: action.payload
		}) : state;
	}
}, initialState);
