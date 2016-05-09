import React from 'react';
import { merge } from 'lodash';

// echarts import
// http://echarts.baidu.com/tutorial.html#%E5%9C%A8%20webpack%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20ECharts
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default React.createClass({
  getDefaultProps() {
    return {
      style: {width: '100%', height: 500},
      option: {
        title: {text: ''},
        tooltip: {},
        xAxis: {
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 0
          },
          data: []
        },
        yAxis: {
          data: []
        },
        series: []
      }
    };
  },
  setOption(option) {
    // 绘制图表
    option = merge({}, this.props.option, option);
    option.series.map((item) => {
      merge(item, {
        type: 'bar',
        barMaxWidth: 40
      });
    });
    if(option.xAxis.data.length > 4) {
      option.xAxis.axisLabel.rotate = 20;
    }
    this.chart.setOption(option);
  },
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    this.chart = echarts.init(this.refs.chart);
  },
  render() {
    return <div {...this.props} ref="chart"></div>
  }
});