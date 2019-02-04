import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import {
  Button, Form, Grid, Header, Icon, Message,
} from 'semantic-ui-react';

import { createDinner as cd } from '../actions/DinnerActions';
import HistoryPropTypes from '../proptypes/HistoryPropTypes';

class DinnerNew extends Component {
  onSubmit(values) {
    const { history, createDinner } = this.props;
    createDinner(values, () => {
      history.push('/dinner');
    });
  }

  static renderField(field) {
    const { meta: { touched, error } } = field;
    return (
      <Fragment>
        <Form.Input
          required
          label={field.label}
          {...field.input}
        />
        {touched && error && <Message content={error} />}
      </Fragment>
    );
  }

  renderDinnerForm() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="title" label="Dinner Title" component={DinnerNew.renderField} />
        <Field name="description" label="Dinner Description" component={DinnerNew.renderField} />
        <Button type="submit">Save Dinner</Button>
      </Form>
    );
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
    createDinner: cd,
  }, dispatch);
}

export default reduxForm({
  form: 'DinnerNewForm',
  validate,
})(connect(null, mapDispatchToProps)(DinnerNew));


DinnerNew.propTypes = {
  history: HistoryPropTypes.isRequired,
  createDinner: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
