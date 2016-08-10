import React from "react";
import classNames from "classnames";
import {hashHistory} from "react-router";
import {Menu, Icon, Select} from "antd";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import appsActions from "../../actions/apps";
import rootActions from "../../actions/root";
import "./style.less";

var Dashboard = React.createClass({
	
	
	componentWillMount() {
		let {actions:{getApps, showPageLoading, hidePageLoading, changeDefaultApp}, params:{appId}} = this.props;
		showPageLoading();
		getApps().then(res => {
			const apps = res.payload;
			let initialApp = apps[0];
			let filterApp = appId && apps.filter(app => app.id == appId)[0];
			changeDefaultApp(filterApp ? filterApp : initialApp);
			hidePageLoading();
		}).catch(hidePageLoading);
	},
	render() {
		const SubMenu = Menu.SubMenu;
		const Option = Select.Option;
		const {apps:{appsList}, root:{defaultApp}, children, location} = this.props;
		const currentKey = location.pathname;
		return (
			<div className="page-content-wrapper">
				<div className="sidebar pull-left">
					<div className="p10">
						<Select className="w220" onChange={this.changeApp} value={`${defaultApp.id || ''}`}>
							{
								appsList.map(app => <Option key={app.id} value={`${app.id}`}>{app.name}</Option>)
							}
						</Select>
					</div>
					<Menu className='w240'
						  onClick={({key}) => hashHistory.push(key)}
						  selectedKeys={[currentKey]}
						  defaultOpenKeys={["chan", "chan_management"]}
						  mode="inline">
						<Menu.Item key='/dashboard/apps'>
							<span><Icon type="appstore"/><span>应用概览</span></span>
						</Menu.Item>
						<SubMenu key='chan' title={<span><Icon type="bars" /><span>渠道分析(Non-GP)</span></span>}>
							<Menu.Item key={`/dashboard/apps/${defaultApp.id}/channels/summary`}>渠道列表</Menu.Item>
							<Menu.Item
									   key={`/dashboard/apps/${defaultApp.id}/channels/details`}>渠道详情</Menu.Item>
							<Menu.Item key={`/dashboard/apps/${defaultApp.id}/channels/retention`}>渠道留存</Menu.Item>
						</SubMenu>
						<SubMenu key='chan_management'
								 title={<span><Icon type="solution" /><span>渠道管理</span></span>}>
							<Menu.Item key={`/dashboard/apps/${defaultApp.id}/channels`}>Non-GP</Menu.Item>
						</SubMenu>
					</Menu>
				</div>
				<div className="page-content mb100">
					{children}
				</div>
			</div>
		);
	},
	
	
	changeApp(appId){
		let {actions:{changeDefaultApp}} = this.props;
		const {apps:{appsList}} = this.props;
		const app = appsList.filter(app => app.id == appId);
		changeDefaultApp(...app);
	}
});

// connect action to props
const mapStateToProps = ({apps, root}) => ({apps, root});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators({...appsActions, ...rootActions}, dispatch)});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard);
