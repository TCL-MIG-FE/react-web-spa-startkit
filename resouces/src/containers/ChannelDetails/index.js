import React from "react";
import {Spin, Table, Icon, Button, Form, Input, Select} from "antd";
import {hashHistory} from "react-router";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ChartWrapper from "../../components/Chart";
import ChannelDetailTable from "../../components/ChannelDetailTable";
import SearchForm from "../../components/Search";
import channelsActions from "../../actions/channels";
import rootActions from "../../actions/root";
import "./style.less";


const ChannelDetails = React.createClass({


	getInitialState(){
		return {isPercentageChart:false}
	},
	
	refreshPage(otherParams = {}){
		const {
			actions:{
				queryChannelsChartStatistics,
				queryChannelsTableStatistics,
				queryChannelChartStatistics,
				queryChannelTableStatistics,
				showPageLoading,
				hidePageLoading
			},
			params:{
				appId,
				channelId
			}
		} = this.props;

		const params = {
			appId,
			...otherParams,
		};
		channelId && ( params.tracker = channelId );
		showPageLoading();
		if (channelId) {
			queryChannelChartStatistics(params).then(hidePageLoading);
			queryChannelTableStatistics(params)
		} else {
			queryChannelsChartStatistics(params).then(hidePageLoading);
			queryChannelsTableStatistics(params)
		}

	},
	
	
	componentWillMount() {
		const {
			actions:{
				queryChannelsChartStatistics,
				queryChannelsTableStatistics,
				queryChannelChartStatistics,
				queryChannelTableStatistics,
				queryChannels,
				queryCountries,
				queryTimeDurations,
				showPageLoading,
				hidePageLoading
			},
			params:{
				appId,
				channelId
			}
		} = this.props;

		const params = {
			appId
		};
		channelId && ( params.tracker = channelId );
		showPageLoading();
		queryTimeDurations();
		queryCountries();
		queryChannels(appId);
		if (channelId) {
			queryChannelChartStatistics(params).then(hidePageLoading);
			queryChannelTableStatistics(params)
		} else {
			queryChannelsChartStatistics(params).then(hidePageLoading);
			queryChannelsTableStatistics(params)
		}


	},

	componentWillReceiveProps(nextProps){
		let {root:{defaultApp:{id:nextAppId}}, params:{channelId}} = nextProps;
		let {root:{defaultApp:{id:currentAppId}}, params:{channelId:prevChannelId}} = this.props;
		if (currentAppId && currentAppId !== nextAppId || prevChannelId !== channelId) {
			let location = `dashboard/apps/${nextAppId}/channels/details`;
			channelId && ( location = `dashboard/apps/${nextAppId}/channels/${channelId}/details`);
			hashHistory.push(location);
			// push是一个异步的，只有当地址发生了变化，才重新抓取数据
			setTimeout(() => window.location.reload(), 0);
		}
	},

	doSearch(params){
		this.setState({
			isPercentageChart: params['isPercentageChart'] || false
		}, ()=> {
			delete params['isPercentageChart'];
			this.refreshPage(params);
		});

	},

	render(){
		const {
			channels:{
				channelsChartStatistics,
				channelsTableStatistics,
				channelChartStatistics,
				channelTableStatistics,
				timeDurations,
				channelsList,
				countryList
			},
			params:{channelId}
		} = this.props;
		const {isPercentageChart} = this.state;
		const chartType = channelId ? 'bar' : 'line';
		const items = channelId ? channelTableStatistics : channelsTableStatistics;
		const options = channelId ? channelChartStatistics : channelsChartStatistics;
		let channelName = '';
		if (channelId && channelsList.length > 0) {
			const channel = channelsList.filter(channel => channel.id == channelId)[0];
			channel && ( channelName = channel.name);
		}
		const channelsObj = channelId ? {channelName} : {channels: channelsList};
		return (
			<div>
				<SearchForm countries={countryList}
					{...channelsObj}
							enableQueryPoints={true}
							enableChannelId={false}
							timeDurations={timeDurations}
							onSearch={this.doSearch}
							ref="searchForm"/>
				<div className="chart-wrapper">
					<ChartWrapper chartType={chartType} isPercentageChart={isPercentageChart} options={options}/>
				</div>
				<ChannelDetailTable items={items}/>
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
)(ChannelDetails);
