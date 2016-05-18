const getApi = (url) => '/api' + url;

export const CODE_SUCCESS = 200;
export const GET_USER = getApi('/address');
export const SAVE_CONFIG = getApi('/config');
export const GET_CHART_DATA = getApi('/chartData');
