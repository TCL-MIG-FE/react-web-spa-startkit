import React from "react";
import {Form, Input, Select, Icon, Col} from "antd";
import AgentForm from './AgentForm';
import SourceForm from './SourceForm';

let ChannelForm = React.createClass({
	
	getInitialState(){
		return {
			agentVisible: false,
			sourceVisible: false
		}
	},
	
	render(){
		
		const FormItem = Form.Item;
		const {form, channel, agents, sources} = this.props;
		const {agentVisible, sourceVisible} = this.state;
		const {getFieldProps} = form;
		const Option = Select.Option;
		const layouts = {
			labelCol: {span: 4},
			wrapperCol: {span: 18}
		};
		
		
		const channelNameProps = getFieldProps("channelName", {
			rules: [{required: true, message: "渠道名称不可以为空"}],
			initialValue: channel['name']
		});
		
		const agentProps = getFieldProps("agent", {
			rules: [{required: true, message: "Agent不可以为空"}],
			initialValue: channel['agent'] && `${channel['agent']}`
		});
		const sourceProps = getFieldProps("source", {
			rules: [{required: true, message: "Source不可以为空"}],
			initialValue: channel['source'] && `${channel['source']}`
		});
		
		const descriptionProps = getFieldProps("description", {
			initialValue: channel['description']
		});
		
		return (
			
			<Form horizontal >
				<FormItem label="APP名称：" {...layouts} >
					<p className="ant-form-text">{channel.appName}</p>
				</FormItem>
				<FormItem label="APP包名：" {...layouts} >
					<p className="ant-form-text">{channel.pkgName}</p>
				</FormItem>
				
				<FormItem label="渠道名称：" {...layouts} >
					<Input placeholder="请输入渠道名称" {...channelNameProps}  />
				</FormItem>
				
				<FormItem label="Agent：" {...layouts}>
					<Col span={23} className="ant-form-item-control">
						<FormItem>
							<Select placeholder="请选择Agent" {...agentProps} required>
								{agents.map(agent => <Option key={`${agent.id}`}>{agent.name}</Option>)}
							</Select>
						</FormItem>
					</Col>
					<Col span={1}>
						<Icon type="plus-circle" className="ml10 channel-add-icon" onClick={this.addAgent}></Icon>
					</Col>
				
				</FormItem>
				
				<FormItem label="Source：" {...layouts} required>
					<Col span={23}>
						<FormItem>
							<Select placeholder="请选择Source" {...sourceProps}>
								{sources.map(source => <Option key={`${source.id}`}>{source.name}</Option>)}
							</Select>
						</FormItem>
					</Col>
					<Col span={1}>
						<Icon type="plus-circle" className="ml10 channel-add-icon" onClick={this.addSource}></Icon>
					</Col>
				</FormItem>
				<FormItem label="备注：" {...layouts} >
					<Input type="textarea" placeholder="请输入备注"  {...descriptionProps} />
				</FormItem>
				
				<AgentForm
					visible={agentVisible}
					onCancel={this.hideModal}
					onSave={this.saveAgent}
					ref="agentForm"/>
				
				<SourceForm
					visible={sourceVisible}
					onCancel={this.hideModal}
					onSave={this.saveSource}
					ref="sourceForm"/>
			
			</Form>
		
		)
		
	},

	hideModal( callback ){
		this.setState({
			agentVisible:false,
			sourceVisible:false,
		}, ()=>{
			typeof(callback) === 'function' && callback();
		})
	},
	
	addAgent(){
		this.setState({agentVisible: true});
	},
	
	addSource(){
		this.setState({sourceVisible: true});
	},
	
	saveAgent(){
		let {onSaveAgent} = this.props;
		let {agentForm} = this.refs;
		agentForm.validateFieldsAndScroll((errors, value) => {
			if (!!errors) {
				return;
			}
			agentForm.resetFields();
			this.hideModal(()=>{
				onSaveAgent(value);
			})

		});
	},
	
	saveSource(){
		let {onSaveSource} = this.props;
		let {sourceForm} = this.refs;

		sourceForm.validateFieldsAndScroll((errors, value) => {
			if (!!errors) {
				return;
			}
			sourceForm.resetFields();
			this.hideModal(()=>{
				onSaveSource(value);
			})
		});
	}
	
});

ChannelForm.propTypes = {
	channel: React.PropTypes.object.isRequired,
	onSaveAgent: React.PropTypes.func.isRequired,
	onSaveSource: React.PropTypes.func.isRequired
};


ChannelForm = Form.create()(ChannelForm);

export default ChannelForm;