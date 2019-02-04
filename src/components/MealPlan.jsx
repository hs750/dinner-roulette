import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Button, Card, Dimmer, Grid, Header, Icon, Loader, Segment,
} from 'semantic-ui-react';

import { fetchMealPlan as fmp, fetchMealPlanDay as fmpd, toggleLockMealPlanDay as tlmpd } from '../actions/MealPlanActions';
import { MealPropTypes } from '../proptypes/MealPropTypes';

class MealPlan extends Component {
  componentDidMount() {
    const { fetchMealPlan } = this.props;
    fetchMealPlan(false);
  }

  renderMealPlan() {
    const { mealPlan, toggleLockMealPlanDay, fetchMealPlanDay } = this.props;
    return _.map(mealPlan, (mealDay, day) => (
      <Card key={day}>
        <Card.Content>
          <Card.Header>{day}</Card.Header>
          <Card.Meta>{mealDay.dinner.title}</Card.Meta>
          <Card.Description>
            {mealDay.dinner.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              onClick={() => toggleLockMealPlanDay(day)}
              basic
              color={mealDay.isLocked ? 'red' : 'green'}
            >
              {mealDay.isLocked ? 'Unlock' : 'Lock'}
            </Button>
            <Button onClick={() => fetchMealPlanDay(day)} basic color="red">
              Re-roll
            </Button>
          </div>
        </Card.Content>
      </Card>
    ));
  }

  render() {
    const { mealPlan, fetchMealPlan } = this.props;
    if (!mealPlan) {
      return (
        <Segment>
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        </Segment>
      );
    }

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
              <Button onClick={() => fetchMealPlan(true)} icon labelPosition="right">
                Re-roll Wheel
                <Icon name="refresh" />
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2">
              Meal Plan
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Card.Group>
              {this.renderMealPlan()}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchMealPlan: fmp,
    fetchMealPlanDay: fmpd,
    toggleLockMealPlanDay: tlmpd,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    mealPlan: state.mealPlan,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MealPlan);

MealPlan.propTypes = {
  fetchMealPlan: PropTypes.func.isRequired,
  toggleLockMealPlanDay: PropTypes.func.isRequired,
  fetchMealPlanDay: PropTypes.func.isRequired,
  mealPlan: MealPropTypes.isRequired,
};
