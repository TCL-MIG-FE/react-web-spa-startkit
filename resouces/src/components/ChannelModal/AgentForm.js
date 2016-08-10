import React from "react";
import {Form, Input} from "antd";
import Modal from "../Modal";


let AgentForm = React.createClass({

	render(){
		const FormItem = Form.Item;
		const {form, visible, onCancel, onSave} = this.props;
		const {getFieldProps} = form;
		const layouts = {
			labelCol: {span: 4},
			wrapperCol: {span: 18}
		};
		
		const agentNameProps = getFieldProps("name", {
			rules: [{required: true, message: "Agent名称不可以为空"}]
		});
		
		return (
			<Modal title="新建Agent" visible={visible} onCancel={onCancel} onSave={onSave}>
				<Form horizontal>
					<FormItem label="Agent：" {...layouts} required>
						<Input {...agentNameProps} placeholder="请输入Agent名称"/>
					</FormItem>
				</Form>

			</Modal>
		);
	}
});

AgentForm.propTypes = {
	visible:React.PropTypes.bool.isRequired,
	onSave: React.PropTypes.func.isRequired,
	onCancel: React.PropTypes.func.isRequired,
};


AgentForm = Form.create()(AgentForm);



export default AgentForm;

