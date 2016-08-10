import React from "react";
import {Form, Input, Select, Icon} from "antd";
import Modal from "../Modal";
import "./style.less";
import ChannelForm from "./ChannelForm";


let ChannelFormModal = React.createClass({
	
	
	render(){
		const {title, channel, agents, sources, visible, onSaveAgent, onSaveSource} = this.props;
		return (
			
			<Modal title={title} visible={visible} onCancel={this.onCancel} onSave={this.submitForm}>
				<ChannelForm ref="channelForm"
							 onSaveAgent={onSaveAgent}
							 onSaveSource={onSaveSource}
							 agents={agents}
							 sources={sources}
							 channel={channel}/>
			</Modal>
		)
	},
	
	submitForm(){
		let {onSubmit, channel} = this.props;
		let {channelForm} = this.refs;
		channelForm.validateFieldsAndScroll((errors, value) => {
			if (!!errors) {
				return;
			}
			channel.id && (value.id = channel.id);
			value.appId = channel.appId;
			value.pkgName = channel.pkgName;
			value.appName = channel.appName;
			channelForm.resetFields();
			onSubmit(value);
		});
	},
	
	
	onCancel(){
		let {channelForm} = this.refs;
		channelForm.resetFields();
		this.props.onCancel();
		
	},
});

ChannelFormModal.propTypes = {
	title: React.PropTypes.string.isRequired,
	channel: React.PropTypes.object.isRequired,
	sources: React.PropTypes.array.isRequired,
	agents: React.PropTypes.array.isRequired,
	onSubmit: React.PropTypes.func.isRequired,
	onSaveAgent:React.PropTypes.func.isRequired,
	onSaveSource: React.PropTypes.func.isRequired,
	visible: React.PropTypes.bool.isRequired
};


export default ChannelFormModal;