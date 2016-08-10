import React from "react";
import {Spin, Icon, Button} from "antd";
import {Link} from "react-router";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import appsActions from "../../actions/apps";
import rootActions from "../../actions/root";
import AppSumaryModal from "../../components/AppSummaryModal";
import Table from "../../components/Table";
import "./style.less";

var AppSummary = React.createClass({


	getInitialState(){
		return {
			title: '',
			visible: false,
			app: {},
		}
	},


	componentWillReceiveProps(nextProps){
		let {root:{defaultApp:{id:nextAppId}}} = nextProps;
		let {root:{defaultApp:{id:currentAppId}}} = this.props;
		if ((!currentAppId && nextAppId) || ( currentAppId && currentAppId !== nextAppId )) {
			let {actions:{getAppsSummary, showPageLoading, hidePageLoading}} = this.props;
			showPageLoading();
			getAppsSummary(nextAppId).then(hidePageLoading);
		}
	},


	addNewApp(){
		this.setState({
			title: '新增应用',
			visible: true,
			app: {}
		})
	},

	editApp(appIndex){
		const {apps:{appsList}} = this.props;
		this.setState({
			title: '修改应用信息',
			visible: true,
			app: appsList[appIndex]
		})
	},

	genColumns(){
		var self = this;
		return [

			{
				title: '是否Non-GP推广',
				key: 'isNoGP',
				dataIndex: 'dataIndex',
				render(text, record){
					return record.noGP ? '是' : '否'
				}
			},

			{
				title: '应用名称', key: 'appName', dataIndex: 'appName', render(text, record){
				return <Link to={`/dashboard/apps/${record.appId}/channels/summary`}>{text}</Link>
			}
			},
			{title: '昨日新增（整体）', key: 'allNews', dataIndex: 'allNews'},
			{title: '昨日新增（Non-GP）', key: 'news', dataIndex: 'news'},
			{title: '昨日活跃（整体）', key: 'allActives', dataIndex: 'allActives'},
			{title: '昨日活跃（Non-GP）', key: 'actives', dataIndex: 'actives'},
			{
				title: '操作',
				key: 'operate',
				render(text, record, index){
					return <a href="javascript:void(0)" onClick={self.editApp.bind(self, index)}>编辑</a>
				}
			}

		]
	},


	refreshPage(){
		let {actions:{showPageLoading, hidePageLoading, getApps, changeDefaultApp, getAppsSummary}} = this.props;
		showPageLoading();
		// 修改应用后需要重新加载应用和应用概要信息
		Promise.all([getApps(), getAppsSummary()]).then(res => {
			// 重新选择默认应用
			//changeDefaultApp(res[0].payload[0].id);
			hidePageLoading();
		}).catch(hidePageLoading);
	},

	saveApp(app){
		let {actions:{createApp}} = this.props;
		createApp(app).then(()=> {
			this.cancelSave(this.refreshPage);
		});
	},

	cancelSave(callback){
		this.setState({
			title: '',
			visible: false
		}, ()=> {
			typeof(callback) === 'function' && callback();
		})
	},


	render() {
		const columns = this.genColumns();
		const {apps:{appsSummary}} = this.props;
		const {title, visible, app} = this.state;
		return (
			<div>
				<div className="overflow-h m10">
					<Button className="pull-right" type="primary" icon="plus" onClick={this.addNewApp}>添加新应用</Button>
				</div>
				<Table columns={columns} dataSource={appsSummary} pagination={false}></Table>
				<AppSumaryModal
					app={app}
					visible={visible}
					title={title}
					onCancel={this.cancelSave}
					onSubmit={this.saveApp}/>
			</div>
		)
	}
});

// connect action to props
const mapStateToProps = ({apps, root}) => ({apps, root});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators({...appsActions, ...rootActions}, dispatch)});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppSummary);
