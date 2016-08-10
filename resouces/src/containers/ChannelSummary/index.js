import React from "react";
import {Icon, Button} from "antd";
import {Link, hashHistory} from "react-router";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import channelsActions from "../../actions/channels";
import rootActions from "../../actions/root";
import Table from '../../components/Table';
import SearchForm from "../../components/Search";
import "./style.less";

let ChannelSummary = React.createClass({
	
	
	getInitialState(){
		return {
			title: '',
			visible: false,
			channel: {},
		}
	},
	
	refreshPage(otherParams = {}){
		let {
			actions:{
				queryChannelsSummary,
				showPageLoading,
				hidePageLoading
			},
			params:{appId}
		} = this.props;
		showPageLoading();
		queryChannelsSummary({appId, ...otherParams}).then(hidePageLoading)
	},
	
	
	componentWillMount() {
		let {
			actions:{
				queryChannelsSummary,
				getAgents,
				getSources,
				queryChannels,
				queryCountries,
				showPageLoading,
				hidePageLoading
			},
			params:{appId}
		} = this.props;
		showPageLoading();
		queryChannels(appId);
		getAgents();
		getSources();
		queryCountries();
		queryChannelsSummary({appId}).then(hidePageLoading);
	},
	
	componentWillReceiveProps(nextProps){
		let {root:{defaultApp:{id:nextAppId}}} = nextProps;
		let {root:{defaultApp:{id:currentAppId}}} = this.props;
		if (currentAppId && currentAppId !== nextAppId) {
			hashHistory.push(`/dashboard/apps/${nextAppId}/channels/summary`);
			// push是一个异步的，只有当地址发生了变化，才重新抓取数据
			setTimeout(() => this.refreshPage(), 0);
		}
	},
	
	
	genColumns(){
		return [
			
			{title: '渠道ID', key: 'tracker', dataIndex: 'tracker'},
			
			{
				title: '渠道名称', key: 'channelName', dataIndex: 'channelName', render(text, record){
				return <Link to={`/dashboard/apps/${record.appId}/channels/${record.tracker}/details`}>{text}</Link>
			}
			},
			{title: '昨日新增', key: 'news', dataIndex: 'news'},
			{title: '日环比', key: 'newsRelativeRatio', dataIndex: 'newsRelativeRatio'},
			{title: '昨日活跃', key: 'actives', dataIndex: 'actives'},
			{title: '日环比', key: 'activesRelativeRatio', dataIndex: 'activesRelativeRatio'},
			{title: '昨日启动次数', key: 'starts', dataIndex: 'starts'},
			{title: '日环比', key: 'startsRelativeRatio', dataIndex: 'startsRelativeRatio'},
			{title: 'agent', key: 'agent', dataIndex: 'agent'},
			{title: 'source', key: 'source', dataIndex: 'source'},
			{title: '国家', key: 'country', dataIndex: 'country'},
		
		]
	},

	doSearch(params){
		this.refreshPage(params);
	},
	
	
	render() {
		const columns = this.genColumns();
		const {channels:{channelsSummaryList, agentsList, sourcesList, countryList, channelsList}} = this.props;
		return (
			<div>
				<SearchForm
					onSearch={ this.doSearch }
					sources={sourcesList}
					channels={channelsList}
					agents={agentsList}
					countries={countryList}/>
				<Table columns={columns} dataSource={channelsSummaryList} pagination={false}></Table>
			
			</div>
		)
	}
});

// connect action to props
const mapStateToProps = ({channels, root}) => ({channels, root});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators({...channelsActions, ...rootActions}, dispatch)});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChannelSummary);
