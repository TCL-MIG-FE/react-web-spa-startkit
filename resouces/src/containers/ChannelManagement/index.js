import React from "react";
import merge from "lodash.merge";
import {Spin, Icon, Button} from "antd";
import {Link, hashHistory} from "react-router";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import channelsActions from "../../actions/channels";
import rootActions from "../../actions/root";
import ChannelModal from "../../components/ChannelModal";
import SearchForm from "../../components/Search";
import Table from "../../components/Table";

var ChannelManagement = React.createClass({
	
	
	getInitialState(){
		return {
			title: '',
			visible: false,
			channel: {},
		}
	},

	refreshPage(otherParams = {}){
		let {actions:{queryChannels, showPageLoading, hidePageLoading}, params:{appId}} = this.props;
		showPageLoading();
		queryChannels(appId, {...otherParams}).then(hidePageLoading)
	},
	
	
	componentWillMount() {
		let {actions:{queryChannels, getAgents, getSources, showPageLoading, hidePageLoading}, params} = this.props;
		showPageLoading();
		Promise.all([queryChannels(params['appId']), getAgents(), getSources()]).then(hidePageLoading);
	},

	componentWillReceiveProps(nextProps){
		let {root:{defaultApp:{id:nextAppId}}} = nextProps;
		let {root:{defaultApp:{id:currentAppId}}} = this.props;
		if (currentAppId && currentAppId !== nextAppId) {
			hashHistory.push(`/dashboard/apps/${nextAppId}/channels`);
			// push是一个异步的，只有当地址发生了变化，才重新抓取数据
			setTimeout(() => this.refreshPage(), 0);
		}
	},


	getMixinedChannel(channel){
		const {root:{defaultApp}} = this.props;
		return merge({}, channel, {
			appId: defaultApp['id'],
			pkgName: defaultApp['pkgName'],
			appName: defaultApp['name'],
		})

	},

	addNewChannel(){
		this.setState({
			title: '新增渠道',
			visible: true,
			channel: this.getMixinedChannel({})
		})
	},
	
	editChannel(appIndex){
		const {channels:{channelsList}, root:{defaultApp}} = this.props;
		let channel = channelsList[appIndex];
		channel = this.getMixinedChannel(channel);
		this.setState({
			title: '修改渠道信息',
			visible: true,
			channel: channel
		})
	},
	
	genColumns(){
		var self = this;
		return [
			
			{title: '渠道ID', key: 'tracker', dataIndex: 'tracker'},
			
			{
				title: '渠道名称', key: 'name', dataIndex: 'name', render(text, record){
				return <Link to={`/dashboard/apps/${record.appId}/channels/${record.tracker}/details`}>{text}</Link>
			}
			},
			{title: 'Agent', key: 'agent', dataIndex: 'agent'},
			{title: 'Source', key: 'source', dataIndex: 'source'},
			{title: '最近编辑者', key: 'createdUser', dataIndex: 'createdUser'},
			{
				title: '最近编辑时间', key: 'createdTime', dataIndex: 'createdTime', render(text){
				const date = new Date(Number(text));
				const year = date.getFullYear();
				const month = ('0' + (date.getMonth() + 1)).slice(-2);
				const day = ('0' + date.getDate()).slice(-2);
				return `${year}-${month}-${day}`
			}
			},
			{title: '备注', key: 'description', dataIndex: 'description', width: 180},
			{
				title: '操作',
				key: 'operate',
				render(text, record, index){
					return <a href="javascript:void(0)" onClick={self.editChannel.bind(self, index)}>编辑</a>
				}
			}
		
		]
	},
	
	saveChannel(channel){
		let {actions:{createChannel, updateChannel}} = this.props;
		if (channel.id) {
			updateChannel(channel).then(()=> {
				this.cancelSave(this.refreshPage);
			});
		} else {
			createChannel(channel).then(()=> {
				this.cancelSave(this.refreshPage);
			});
		}

	},
	
	saveAgent(agent){
		let {actions:{createAgent, getAgents}} = this.props;
		createAgent(agent).then(getAgents);
	},
	
	saveSource(source){
		let {actions:{createSource, getSources}} = this.props;
		createSource(source).then(getSources);
	},
	
	cancelSave(callback){
		this.setState({
			title: '',
			visible: false,
			channel: {}
		}, ()=> {
			typeof(callback) === 'function' && callback();
		})
	},


	doSearch(params){
		this.refreshPage(params);
	},
	
	render() {
		const columns = this.genColumns();
		const {channels:{channelsList, agentsList, sourcesList}} = this.props;
		const {title, visible, channel} = this.state;
		return (
			<div>

				<div className="overflow-h">
					<SearchForm agents={agentsList} sources={sourcesList} onSearch={this.doSearch}>
						<Button className="pull-right" type="primary" icon="plus"
								onClick={this.addNewChannel}>添加渠道</Button>
					</SearchForm>

				</div>

				<Table columns={columns} dataSource={channelsList} pagination={false}></Table>
				
				<ChannelModal
					channel={channel}
					agents={agentsList}
					sources={sourcesList}
					visible={visible}
					title={title}
					onSaveAgent={this.saveAgent}
					onSaveSource={this.saveSource}
					onCancel={this.cancelSave}
					onSubmit={this.saveChannel}/>
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
)(ChannelManagement);
