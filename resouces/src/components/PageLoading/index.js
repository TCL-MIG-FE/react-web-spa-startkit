import React from "react";
import './style.less';

export default React.createClass({
	render() {
		return <div className="page-loading-wrapper">
			<div className="spinner">
				<div className="bounce1"></div>
				<div className="bounce2"></div>
				<div className="bounce3"></div>
			</div>
		</div>
	}
});
