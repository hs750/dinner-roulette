import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Button, Card, Grid, Header, Icon,
} from 'semantic-ui-react';

import { fetchDinners as fd } from '../actions/DinnerActions';
import DinnerPropType from '../proptypes/DinnerPropTypes';

class DinnerIndex extends Component {
  componentDidMount() {
    const { fetchDinners } = this.props;
    fetchDinners();
  }

  renderDinners() {
    const { dinners } = this.props;
    return _.map(dinners, dinner => (
      <Card key={dinner.id}>
        <Card.Content>
          <Card.Header>
            <Link key={dinner.id} to={`/dinner/${dinner.id}`}>
              {dinner.title}
            </Link>
          </Card.Header>
          <Card.Description content={dinner.description} />
        </Card.Content>
      </Card>
    ));
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
              <Link to="/dinner/new">
                <Button icon labelPosition="right">
                  Add Dinner
                  <Icon name="add" />
                </Button>
              </Link>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2">
              Dinners
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Card.Group>
              {this.renderDinners()}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchDinners: fd,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    dinners: state.dinners,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DinnerIndex);

DinnerIndex.propTypes = {
  dinners: DinnerPropType.isRequired,
  fetchDinners: PropTypes.func.isRequired,
};
