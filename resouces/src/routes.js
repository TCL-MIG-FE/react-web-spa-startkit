import React from "react";
import {Router, Route, IndexRedirect, hashHistory} from "react-router";
import App from "./containers/App";
import AppSummary from './containers/AppSummary';
import ChannelManagement from './containers/ChannelManagement';
import ChannelSummary from './containers/ChannelSummary';
import ChannelRetention from './containers/ChannelRetention';
import ChannelDetails from './containers/ChannelDetails';
import NotFound from "./containers/NotFound";
import Dashboard from "./containers/Dashboard";

export default React.createClass({
	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRedirect to="dashboard/apps"/>
					<Route path="dashboard" component={Dashboard}>
						<Route path="apps" component={AppSummary} />
						<Route path="apps/:appId/channels" component={ChannelManagement} />
						<Route path="apps/:appId/channels/summary" component={ChannelSummary} />
						<Route path="apps/:appId/channels/retention" component={ChannelRetention} />
						<Route path="apps/:appId/channels/details" component={ChannelDetails} />
						<Route path="apps/:appId/channels/:channelId/details" component={ChannelDetails} />
					</Route>
					<Route path="*" component={NotFound}/>
				</Route>
			</Router>
		);
	}
});
