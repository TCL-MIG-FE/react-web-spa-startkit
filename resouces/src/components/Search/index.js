import React from "react";
import {Form, Input, Select} from "antd";

let UniversalSearchForm = React.createClass({


	getDefaultProps(){
		return {
			enableQueryPoints: false,
		}
	},


	getInitialState(){
		return {
			tracker: '',
			source: '',
			agent: '',
			country: '',
			queryPoint: 'news',
			timestampFrom: '',
			timestampTo: ''
		}
	},

	componentWillReceiveProps(nextProps){
		let {timestampFrom, timestampTo} = this.state;
		let {timeDurations} = nextProps;
		if (!timestampFrom && !timestampTo && timeDurations && timeDurations.length > 0) {
			const duration = nextProps.timeDurations[0];
			this.setState({
				timestampFrom: duration['timestampFrom'],
				timestampTo: duration['timestampTo']
			})
		}
	},


	render(){
		const FormItem = Form.Item;
		const Option = Select.Option;
		const {
			form:{getFieldProps},
			countries,
			enableQueryPoints,
			agents,
			channels,
			sources,
			timeDurations,
			channelName,
			children
		} = this.props;
		const channelProps = channels && getFieldProps('tracker', {initialValue: this.state.tracker});
		const agentsProps = agents && getFieldProps('agent', {initialValue: this.state.agent});
		const sourcesProps = sources && getFieldProps('source', {initialValue: this.state.source});
		const countryProps = countries && getFieldProps('country', {initialValue: this.state.country});
		const queryPointProps = enableQueryPoints && getFieldProps('queryPoint', {initialValue: this.state.queryPoint});
		const timeDurationsProps = timeDurations && getFieldProps('timeDuration', {...this.buildTimeDurationInitialValues()});
		return (
			<Form inline className="clearfix mb30">

				{
					channelName && <FormItem label="渠道名称">
						<Input value={channelName} disabled/>
					</FormItem>
				}

				{
					channels && <FormItem label="渠道">
						<Select {...channelProps} onChange={this.doSearch.bind(this,channelProps.id)}>
							<Option value="">全部</Option>
							{
								channels.map(channel => <Option key={channel.tracker}
																value={`${channel.tracker}`}>{channel.name}</Option>)
							}
						</Select>
					</FormItem>
				}

				{
					agents && <FormItem label="Agents">
						<Select {...agentsProps} onChange={this.doSearch.bind(this, agentsProps.id)}>
							<Option value="">全部Agents</Option>
							{
								agents.map(agent => <Option key={agent.id}
															value={`${agent.id}`}>{agent.name}</Option>)
							}
						</Select>
					</FormItem>
				}

				{
					sources && <FormItem label="Sources">
						<Select {...sourcesProps} onChange={this.doSearch.bind(this, sourcesProps.id)}>
							<Option value="">全部Sources</Option>
							{
								sources.map(source => <Option key={source.id}
															  value={`${source.id}`}>{source.name}</Option>)
							}
						</Select>
					</FormItem>
				}

				{
					countries && <FormItem label="地域">
						<Select {...countryProps} onChange={this.doSearch.bind(this, countryProps.id)}>
							<Option value="">全球</Option>
							{
								countries.map(country => <Option key={country.id}
																 value={`${country.id}`}>{country.name}</Option>)
							}
						</Select>
					</FormItem>
				}


				{
					enableQueryPoints && <FormItem label="查询指标">
						<Select {...queryPointProps} onChange={this.doSearch.bind(this, queryPointProps.id)}>
							<Option value="news">新增用户</Option>
							<Option value="keep1Ratio">新用户次日留存率</Option>
							<Option value="keep3Ratio">新用户3日后留存率</Option>
							<Option value="keep7Ratio">新用户7日后留存率</Option>
							<Option value="keep30Ratio">新用户30日后留存率</Option>
							<Option value="actives">活跃用户</Option>
							<Option value="starts">启动次数</Option>
							<Option value="total">总用户数</Option>
							<Option value="startAvg">平均启动次数</Option>
						</Select>
					</FormItem>
				}

				{

					timeDurations && <FormItem className="pull-right" label="查询周期">
						<Select dropdownMatchSelectWidth={false} {...timeDurationsProps}
								onChange={this.doSearch.bind(this, timeDurationsProps.id)}>
							{
								timeDurations.map(time => <Option
									key={`${time.timestampFrom}_${time.timestampTo}`}>{time.view}</Option>)
							}
						</Select>
					</FormItem>
				}

				{children}


			</Form>
		)
	},

	splitTimeStamp(timestamp){
		let array = timestamp.split('_');
		let obj = {}
		obj['timestampFrom'] = array[0];
		obj['timestampTo'] = array[1];
		return obj;
	},

	doSearch(name, value){
		let obj = {};
		const KEY = 'timeDuration';
		if (name == KEY) {
			obj = this.splitTimeStamp(value);
		} else {
			obj[name] = value;
		}

		this.setState(obj, () => {
			const {form, onSearch} = this.props;
			form.validateFields((_, values) => {
				const duration = values[KEY];
				// 开始时间和结束时间处理
				if (duration) {
					values = {...values, ...this.splitTimeStamp(duration)};
					delete values[KEY]
				}

				// 检测queryPoint是否百分比类型
				values['queryPoint'] && /ratio/i.test(values['queryPoint']) && (values['isPercentageChart'] = true);


				onSearch && onSearch(values);
			})
		})


	},


	buildTimeDurationInitialValues(){
		const {timestampFrom, timestampTo} = this.state;
		if (timestampFrom && timestampTo) {
			return {initialValue: `${timestampFrom}_${timestampTo}`};
		}
		return {};
	}

});


UniversalSearchForm.propTypes = {
	countries: React.PropTypes.array,
	channels: React.PropTypes.array,
	sources: React.PropTypes.array,
	agents: React.PropTypes.array,
	timeDurations: React.PropTypes.array,
	enableQueryPoints: React.PropTypes.bool,
	onSearch: React.PropTypes.func,

};


UniversalSearchForm = Form.create()(UniversalSearchForm);

export default UniversalSearchForm;