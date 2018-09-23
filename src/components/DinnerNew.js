import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, Grid, Header, Icon, Message } from 'semantic-ui-react';

import { createDinner } from '../actions/DinnerActions';

class DinnerNew extends Component {
  onSubmit(values) {
    this.props.createDinner(values, () => {
      this.props.history.push('/dinner');
    });
  }

  render() {
    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column>
            <Button.Group>
              <Link to="/">
                <Button icon labelPosition="left">
                  Back to Home
                  <Icon name="home" />
                </Button>
              </Link>
              <Button.Or />
              <Link to="/dinner">
                <Button icon labelPosition="right">
                  Back to Dinners
                  <Icon name="arrow left" />
                </Button>
              </Link>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2">
              Add Dinner
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            {this.renderDinnerForm()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  renderDinnerForm() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="title" label="Dinner Title" component={this.renderField} />
        <Field name="description" label="Dinner Description" component={this.renderField} />
        <Button type="submit">Save Dinner</Button>
      </Form>
    );
  }

  renderField(field) {
    const { meta: { touched, error } } = field;

    return (
      <Fragment>
        <Form.Input required
          label={field.label}
          {...field.input} />
        {touched && error && <Message content={error} />}
      </Fragment>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = '* Enter a title.';
  }
  if (!values.description) {
    errors.description = '* Enter a description.';
  }

  return errors;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createDinner: createDinner
  }, dispatch);
}

export default reduxForm({
  form: 'DinnerNewForm',
  validate: validate
})(connect(null, mapDispatchToProps)(DinnerNew));