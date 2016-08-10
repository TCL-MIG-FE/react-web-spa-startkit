import React from "react";
import Chart from "./Chart";


const ChartWrapper = React.createClass({

	render(){
		return this.getChart();
	},

	getChart(){

		let {chartType, isPercentageChart, ...otherProps} = this.props;

		return <Chart chartType={chartType} isPercentageChart={isPercentageChart} {...otherProps} />
	}
});


ChartWrapper.propTypes = {
	chartType: React.PropTypes.oneOf(["line", "bar"]).isRequired,
	isPercentageChart: React.PropTypes.bool.isRequired
};

export default ChartWrapper;