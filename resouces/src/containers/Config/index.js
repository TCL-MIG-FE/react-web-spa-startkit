import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, getValues } from 'redux-form';

import style from './style.less';
import configAction from '../../actions/config';

const CONFIG_FORM = 'configFormAll';

import { Grid, Row, Col, Input, Button, FormControls} from 'react-bootstrap';

var Config = React.createClass({
  onSubmit() {
    return this.props.actions.submitConfig(getValues(this.props.configForm)).then(() => {
      if(this.props.data.formError) {
        return Promise.reject({email: this.props.data.formError})
      } else {
        return true;
      }
    });
  },
  render() {
    var {params, fields: {firstName, lastName, email}, handleSubmit, submitting, data} = this.props;
    var firstNameHasError = firstName.touched && firstName.error;
    var lastNameHasError = lastName.touched && lastName.error;
    var emailHasError = email.touched && email.error;

    return (
      <Grid>
        <Row>
          <Col md={10} mdPush={2}>
            <h1>Config</h1>
          </Col>
        </Row>
        {
          params.id ?
          <p>{params.id}</p> :
          <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)} noValidate>
            <Input type="text" label="First Name" labelClassName="col-xs-2" wrapperClassName="col-xs-6"
                   {...(firstNameHasError && {bsStyle : 'error', help: firstName.error})} {...firstName}/>
            <Input type="text" label="Last Name" labelClassName="col-xs-2" wrapperClassName="col-xs-6"
                   {...(lastNameHasError && {bsStyle : 'error', help: lastName.error})} {...lastName}/>
            <Input type="email" label="Email" labelClassName="col-xs-2" wrapperClassName="col-xs-6"
                   {...(emailHasError && {bsStyle : 'error', help: email.error})} {...email}/>
            <FormControls.Static label=" " labelClassName="col-xs-2" wrapperClassName="col-xs-6">
                <Button type="submit" disabled={submitting} bsStyle="primary">
                  {submitting ? 'Submitting...' : 'Submit'}
                </Button>
            </FormControls.Static>

            <FormControls.Static label="Current Form Data" labelClassName="col-xs-2" wrapperClassName="col-xs-6">
              {JSON.stringify(getValues(this.props.configForm))}
            </FormControls.Static>
            <FormControls.Static label="Saved Form Data" labelClassName="col-xs-2" wrapperClassName="col-xs-6">
              {JSON.stringify(data.formData)}
            </FormControls.Static>
            <FormControls.Static label="Form Result" labelClassName="col-xs-2" wrapperClassName="col-xs-6">
              {JSON.stringify(data.formResult)}
            </FormControls.Static>
          </form>
        }
      </Grid>
    );
  }
});


// @todo: validation should be imported from utils
const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 15) {
    errors.lastName = 'Must be 15 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

Config = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: CONFIG_FORM,                           // a unique name for this form
  fields: ['firstName', 'lastName', 'email'], // all the fields in your form
  validate: validate
})(Config);

// connect action to props
const mapStateToProps = (state) => ({data: state.config, configForm: state.form[CONFIG_FORM]});
const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(configAction, dispatch)});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);
