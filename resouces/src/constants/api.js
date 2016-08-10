if (__DEV__) {
	!window.config && (window.config = {
		context: '/api'
	});
}

const getApi = (url) => `${window.config.context}${url}`;

export const CODE_SUCCESS = 200;
export const GET_APPS = getApi('/app/list');
export const CREATE_APP = getApi('/app/create');
export const GET_APPS_SUMMARY = getApi('/app/summarylist');
export const GET_AGENTS = getApi('/agent/list');
export const CREATE_AGENT = getApi('/agent/create');

// 获取渠道管理下的NON-GP渠道列表信息
export const QUERY_CHANNELS = getApi('/channel/allbyapp/:appId');

// 获取渠道列表概要信息，包含日环比，日活跃等等
export const QUERY_CHANNELS_SUMMARY = getApi('/channel/summarybyapp');

// 获取所有渠道数据，生成折线图图
export const QUERY_CHANNELS_CHART_STATISTICS = getApi('/channel/linechartbyapp');

// 获取所有渠道的表格信息
export const QUERY_CHANNELS_TABLE_STATISTICS = getApi('/channel/detailbyapp');

// 获取某个特定渠道数据，生成堆积图
export const QUERY_CHANNEL_CHART_STATISTICS = getApi('/channel/heapchartbyapp');

// 获取特定渠道的表格信息
export const QUERY_CHANNEL_TABLE_STATISTICS = getApi('/channel/detailbyapp');

// 获取渠道的留存数据信息
export const QUERY_CHANNELS_RETENTION = getApi('/channel/userkeepbyapp');

// 查询日期列表
export const QUERY_TIMEDURATIONS = getApi('/channel/timedurations');

export const QUERY_COUNTRIES = getApi('/channel/countries');
export const CHANNELS_STATISTICS_EXPORT = getApi('/channel/export');
export const CREATE_CHANNEL = getApi('/channel/create');
export const UPDATE_CHANNEL = getApi('/channel/update');
export const GET_SOURCES = getApi('/source/list');
export const CREATE_SOURCE = getApi('/source/create');

