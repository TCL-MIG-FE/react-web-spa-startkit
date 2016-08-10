import React from "react";
import {Button} from "antd";
import {CHANNELS_STATISTICS_EXPORT} from "../../constants/api";
import Table from "../Table";

const ChannelDetailTable = React.createClass({
	
	
	getInitialState(){
		return {
			visible: false
		}
	},
	
	
	genColumns(){
		
		return [
			
			{title: '日期', key: 'timestamp', dataIndex: 'timestamp'},
			{title: '渠道ID', key: 'tracker', dataIndex: 'tracker'},
			{title: '渠道名称', key: 'channelName', dataIndex: 'channelName'},
			{title: '地域', key: 'country', dataIndex: 'country'},
			{title: '新增用户', key: 'news', dataIndex: 'news'},
			{title: '新用户次日留存率', key: 'keep1Ratio', dataIndex: 'keep1Ratio'},
			{title: '新用户3日后留存率', key: 'keep3Ratio', dataIndex: 'keep3Ratio'},
			{title: '新用户7日后留存率', key: 'keep7Ratio', dataIndex: 'keep7Ratio'},
			{title: '新用户30日后留存率', key: 'keep30Ratio', dataIndex: 'keep30Ratio'},
			{title: '活跃用户', key: 'actives', dataIndex: 'actives'},
			{title: '启动次数', key: 'starts', dataIndex: 'starts'},
			{title: '累计总用户', key: 'total', dataIndex: 'total'},
			{title: '平均启动次数', key: 'startsAvg', dataIndex: 'startsAvg'},
		
		]
		
	},
	
	
	render(){
		
		let {visible} = this.state;
		let {items} = this.props;
		
		return (
			
			<div className="channel-detail-wrapper">
				<div className="clearfix mb10">
					<Button className="pull-right" onClick={this.toggleVisibleState}>
						{!visible ? '展开明细数据' : '隐藏明细数据'}
					</Button>
					<Button className="pull-right mr10" onClick={this.downloadExcel}>下载明细数据</Button>
				</div>
				
				{
					visible && <Table dataSource={items} pagination={false} columns={this.genColumns() }/>
				}
			
			</div>
		
		
		
		)
		
	},
	
	toggleVisibleState(){
		this.setState({
			visible: !this.state.visible
		})
	},
	
	downloadExcel(){
		window.location.href = CHANNELS_STATISTICS_EXPORT;
	}
});


ChannelDetailTable.propTypes = {
	items: React.PropTypes.array.isRequired
};


export default ChannelDetailTable;