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
	GET_SOURCES,
	CREATE_CHANNEL,
	UPDATE_CHANNEL,
	CREATE_AGENT,
	CREATE_SOURCE
} from "../constants/api";
import {createAction} from "redux-actions";
import Api from "../utils/api";

export default {

	// 获取NON-GP的渠道列表信息，用于渠道管理
	queryChannels: createAction(QUERY_CHANNELS, Api.queryChannels),
	
	// 获取渠道列表信息，包含新增，环比等等
	queryChannelsSummary: createAction(QUERY_CHANNELS_SUMMARY,  Api.queryChannelsSummary),

	// 获取所有渠道的详情信息，也就是统计信息，生成折线图表
	queryChannelsChartStatistics: createAction(QUERY_CHANNELS_CHART_STATISTICS, Api.queryChannelsChartStatistics),
	
	// 获取所有渠道的表格详细信息
	queryChannelsTableStatistics: createAction(QUERY_CHANNELS_TABLE_STATISTICS, Api.queryChannelsTableStatistics),
	
	// 获取某个渠道的详情信息，也就是统计信息，生成堆积图表
	queryChannelChartStatistics: createAction(QUERY_CHANNEL_CHART_STATISTICS, Api.queryChannelChartStatistics),

	// 获取某个特定渠道的表格详细信息
	queryChannelTableStatistics: createAction(`${QUERY_CHANNEL_TABLE_STATISTICS}_NEW`,  Api.queryChannelTableStatistics),

    // 获取所有渠道的表格信息,包含1日，3日，7日以及30日以后的留存数据
	queryChannelsRetention:createAction(QUERY_CHANNELS_RETENTION,  Api.queryChannelsRetention),

	// 获取查询时间列表
	queryTimeDurations: createAction(QUERY_TIMEDURATIONS, Api.queryTimeDurations),
	
	// 获取地域列表
	queryCountries: createAction(QUERY_COUNTRIES, Api.queryCountries),
	
	
	getAgents: createAction(GET_AGENTS, Api.getAgents),
	getSources: createAction(GET_SOURCES, Api.getSources),
	createAgent: createAction(CREATE_AGENT, Api.createAgent),
	createSource: createAction(CREATE_SOURCE, Api.createSource),
	createChannel: createAction(CREATE_CHANNEL, Api.createChannel),
	updateChannel: createAction(UPDATE_CHANNEL,  Api.updateChannel),
	
};