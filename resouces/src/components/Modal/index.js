import React from "react";
import {Button, Modal} from "antd";

let CustomModal = React.createClass({
	
	render(){
		const {title, visible, onCancel, children, ...otherProps} = this.props;
		return (
			
			<Modal title={title} maskClosable={false} visible={visible} onCancel={onCancel} footer={this.renderFooter()} {...otherProps}>
				{children}
			</Modal>
		)
	},
	
	renderFooter(){
		
		return [
			<Button key="back" type="ghost" size="large" onClick={this.props.onCancel}>取消</Button>,
			<Button key="submit" type="primary" size="large" onClick={this.props.onSave}>提 交</Button>,
		]
		
	}
});

CustomModal.propTypes = {
	title: React.PropTypes.string.isRequired,
	onSave: React.PropTypes.func.isRequired,
	onCancel: React.PropTypes.func.isRequired,
	visible: React.PropTypes.bool.isRequired
};

export default CustomModal;