import React from "react";
import {Form, Input} from "antd";
import Modal from "../Modal";


let SummaryForm = React.createClass({
	
	
	render(){
		
		const FormItem = Form.Item;
		const {form, app} = this.props;
		const {getFieldProps} = form;
		const layouts = {
			labelCol: {span: 4},
			wrapperCol: {span: 20}
		};
		
		
		const nameProps = getFieldProps("name", {
			rules: [{required: true, message: "应用名称不可以为空"}],
			initialValue: app.name
		});
		
		const pkgNameProps = getFieldProps("pkgName", {
			rules: [{required: true, message: "应用包名不可以为空"}],
			initialValue: app.pkgName
		});
		
		const descriptionProps = getFieldProps("description", {
			initialValue: app.description
		});
		
		return (
			
			<Form horizontal>
				<FormItem label="APP名称：" {...layouts} >
					<Input placeholder="请输入APP名称"  {...nameProps} />
				</FormItem>
				<FormItem label="APP包名：" {...layouts} >
					<Input placeholder="请输入APP包名"  {...pkgNameProps} />
				</FormItem>
				<FormItem label="备注：" {...layouts} >
					<Input type="textarea" placeholder="请输入备注"  {...descriptionProps} />
				</FormItem>
			</Form>
		
		)
		
	}
	
});

SummaryForm.propTypes = {
	app: React.PropTypes.object.isRequired,
};


SummaryForm = Form.create()(SummaryForm);


let SummaryFormModal = React.createClass({
	
	getInitialState(){
		return {needSubmit: false};
	},
	
	render(){
		const {title, app, visible} = this.props;
		return (
			
			<Modal title={title} visible={visible} onCancel={this.onCancel} onSave={this.submitForm}>
				<SummaryForm ref="summaryForm" app={app}/>
			</Modal>
		)
	},
	
	
	submitForm(){
		let {summaryForm} = this.refs;
		let {onSubmit, app} = this.props;
		summaryForm.validateFieldsAndScroll((errors, values) => {
			if (!!errors) {
				return;
			}
			app.id && ( values.id = app.id);
			summaryForm.resetFields();
			onSubmit(values);
		});
	},
	
	
	onCancel(){
		let {summaryForm} = this.refs;
		summaryForm.resetFields();
		this.props.onCancel();
		
	},
});

SummaryFormModal.propTypes = {
	title: React.PropTypes.string.isRequired,
	app: React.PropTypes.object.isRequired,
	onSubmit: React.PropTypes.func.isRequired,
	onCancel:React.PropTypes.func.isRequired,
	visible: React.PropTypes.bool.isRequired
};


export default SummaryFormModal;