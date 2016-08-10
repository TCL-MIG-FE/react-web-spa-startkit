import React from "react";
import {hashHistory} from "react-router";

var Config = React.createClass({
	getInitialState() {
		return {
			redirectSeconds: 2
		}
	},
	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState((state) => {
				state.redirectSeconds--;
				if (state.redirectSeconds <= 0) {
					hashHistory.push('/');
				}
			});
		}, 1000);
	},
	componentWillUnmount() {
		clearInterval(this.interval);
	},
	render() {
		return (
			<p>Page not found, {this.state.redirectSeconds} seconds redirect to home</p>
		);
	}
});

export default Config
