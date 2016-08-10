import React from "react";
import merge from "lodash.merge";
import Echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/grid";


const Chart = React.createClass({

	reDecorateOptions(options){
		let {series} = options;
		if (!series) return;

		let {isPercentageChart, chartType} = this.props;

		let isBarChart  = chartType === 'bar';
		

		const legendNames = [];

		series.forEach(item => {
			item.type = chartType;

			if (isBarChart) {
				item.stack = '__stackbar__';
				item.barWidth = 30;
			}
			legendNames.push(item.name)
		});



		options['yAxis'] = {
			axisLabel: {
				formatter: isPercentageChart ? '{value}%' : '{value}'
			}
		};


		options['legend'] = {
			data: legendNames,
			align: 'right',
			right: 'center',
			bottom: 0
		};

		options['tooltip'] = {
			trigger: 'axis',
			axisPointer: {
				type: isBarChart ? 'shadow' :'line'
			}
		};

		isPercentageChart && ( options['tooltip'].formatter = params => {
			let str = `${params[0].name}<br/>`;
			params.forEach(({color, data, seriesName}) => {
				str = `${str}<span style="width:12px;height:12px;display:inline-block;border-radius:6px;background:${color};"></span>
						${seriesName}：${data}%<br/>`
			});
			return str;
		});

		options['color'] = ['#30aaf7', '#ff9c29', '#ffd717', '#b078fd', '#a2dc25',
			'#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
	},


	componentDidMount(){
		this.echartObj = Echarts.init(this.refs.chart);
		this.renderChart(this.props.options);
		var timer = 0;
		window.addEventListener('resize', () => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				this.echartObj && this.echartObj.resize();
			}, 200)
		});
	},


	renderChart(options){
		options = merge({}, options);
		this.reDecorateOptions(options);
		this.echartObj.setOption(options);

	},

	componentDidUpdate(nextProps){
		this.echartObj.clear();
		this.renderChart(nextProps.options)
	},

	render(){

		return (
			<div ref="chart" style={{ width: '100%', height: '600px' }}></div>

		)
	}

});


Chart.propTypes = {

	options: React.PropTypes.shape({
		series: React.PropTypes.arrayOf(React.PropTypes.object),
		xAxis: React.PropTypes.object
	}),

	isPercentageChart: React.PropTypes.bool.isRequired,
	chartType: React.PropTypes.oneOf(["line", "bar"]).isRequired,
};


export default Chart;