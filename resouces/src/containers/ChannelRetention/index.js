import React from "react";
import {Icon, Button} from "antd";
import {hashHistory} from "react-router";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import channelsActions from "../../actions/channels";
import rootActions from "../../actions/root";
import SearchForm from "../../components/Search";
import Table from "../../components/Table";


var ChannelRetentionSummary = React.createClass({

	
	refreshPage(otherParams = {}){
		let {
			actions:{queryChannelsRetention, showPageLoading, hidePageLoading},
			params:{appId}
		} = this.props;
		showPageLoading();
		queryChannelsRetention({appId, ...otherParams}).then(hidePageLoading)
	},
	
	
	componentWillMount() {
		let {actions:{queryChannelsRetention, queryTimeDurations, queryChannels, queryCountries, showPageLoading, hidePageLoading}, params:{appId}} = this.props;
		showPageLoading();
		queryChannels(appId);
		queryCountries();
		queryTimeDurations();
		queryChannelsRetention({appId}).then(hidePageLoading)
	},
	
	componentWillReceiveProps(nextProps){
		let {root:{defaultApp:{id:nextAppId}}} = nextProps;
		let {root:{defaultApp:{id:currentAppId}}} = this.props;
		if (currentAppId && currentAppId !== nextAppId) {
			hashHistory.push(`/dashboard/apps/${nextAppId}/channels/retention`);
			// push是一个异步的，只有当地址发生了变化，才重新抓取数据
			setTimeout(() => this.refreshPage(), 0);
		}
	},
	
	
	genColumns(){
		return [
			
			{title: '首次使用时间', key: 'timestamp', dataIndex: 'timestamp'},
			{title: '新增用户', key: 'news', dataIndex: 'news'},
			{title: '1日后', key: 'keep1Ratio', dataIndex: 'keep1Ratio'},
			{title: '3日后', key: 'keep3Ratio', dataIndex: 'keep3Ratio'},
			{title: '7日后', key: 'keep7Ratio', dataIndex: 'keep7Ratio'},
			{title: '30日后', key: 'keep30Ratio', dataIndex: 'keep30Ratio'},
		
		]
	},

	doSearch(params){
		this.refreshPage(params);
	},
	
	
	render() {
		const columns = this.genColumns();
		const {channels:{channelsRetentionList, countryList, timeDurations, channelsList}} = this.props;
		return (
			<div>
				<SearchForm
					onSearch={this.doSearch}
					channels={channelsList}
					timeDurations={timeDurations}
					countries={countryList}/>

				<Table  columns={columns} dataSource={channelsRetentionList} pagination={false}></Table>
			
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
)(ChannelRetentionSummary);
