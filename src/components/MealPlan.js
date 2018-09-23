import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button, Card, Dimmer, Grid, Header, Icon, Loader, Segment } from 'semantic-ui-react';

import { fetchMealPlan, fetchMealPlanDay, toggleLockMealPlanDay } from '../actions/MealPlanActions';

class MealPlan extends Component {
  componentDidMount() {
    this.props.fetchMealPlan(false);
  }

  render() {
    if (!this.props.mealPlan) {
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
              <Button onClick={() => this.props.fetchMealPlan(true)} icon labelPosition="right">
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

  renderMealPlan() {
    return _.map(this.props.mealPlan, (mealDay, day) => {
      return (
        <Card key={day}>
          <Card.Content>
            <Card.Header>{day}</Card.Header>
            <Card.Meta>{mealDay.dinner.title}</Card.Meta>
            <Card.Description>
              {mealDay.dinner.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button 
                onClick={() => this.props.toggleLockMealPlanDay(day)} 
                basic 
                color={mealDay.isLocked ? 'red' : 'green'}
              >
                {mealDay.isLocked ? 'Unlock' : 'Lock'}
              </Button>
              <Button onClick={() => this.props.fetchMealPlanDay(day)} basic color="red">
                Re-roll
              </Button>
            </div>
          </Card.Content>
        </Card>
      );
    })
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchMealPlan: fetchMealPlan,
    fetchMealPlanDay: fetchMealPlanDay,
    toggleLockMealPlanDay: toggleLockMealPlanDay
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    mealPlan: state.mealPlan
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MealPlan);