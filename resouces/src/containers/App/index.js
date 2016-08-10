import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import rootActions from "../../actions/root";
import {Icon} from "antd";
import PageLoading from "../../components/PageLoading";
import "../../layouts/css/common.less";
import "./style.less";

var App = React.createClass({
	
	render() {
		let {root, children} = this.props;
		return (
			<div className="page-wrapper">
				{root.pageLoading && <PageLoading />}
				<header className="page-header">
					<h2>Channel Tracking Analyzer</h2>
					<div className="user">
						<span>{root.user.email}</span>
					</div>
					<a href="/logout" className="logout">
						<Icon type="logout"/>
					</a>
				</header>
				{children}
			</div>
		);
	},

	componentWillMount(){
		this.props.actions.getCurrentUser();
	}


});


const mapStateToProps = ({root}) => ({root});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(rootActions, dispatch)});


export default connect(mapStateToProps,mapDispatchToProps)(App);
