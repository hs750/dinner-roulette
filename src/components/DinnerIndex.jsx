import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  Button, Card, Grid, Header, Icon, Message, Popup,
} from 'semantic-ui-react';

import DinnerPropType from '../proptypes/DinnerPropTypes';
import { loadDefaultDinners as ldd, saveDinners as sd } from '../actions/DinnerActions';

class DinnerIndex extends Component {
  renderNoDinners() {
    const { loadDefaultDinners } = this.props;
    return (
      <Message>
        <Header>You have no saved Dinners!</Header>
        <Button.Group>
          <Link to="/dinner/new">
            <Button icon labelPosition="left">
                Add Dinner
              <Icon name="add" />
            </Button>
          </Link>
          <Button.Or />
          <Button icon labelPosition="right" onClick={loadDefaultDinners}>
            Load default dinners
            <Icon name="folder open" />
          </Button>
        </Button.Group>
      </Message>
    );
  }

  renderDinners() {
    const { dinners } = this.props;
    if (!dinners || Object.keys(dinners).length === 0) {
      return this.renderNoDinners();
    }
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
    const { saveDinners } = this.props;
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
            <Button.Group floated="right">
              <Popup trigger={<Button circular icon="save" onClick={saveDinners} />} content="Save dinners to file." />
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
    loadDefaultDinners: ldd,
    saveDinners: sd,
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
  loadDefaultDinners: PropTypes.func.isRequired,
  saveDinners: PropTypes.func.isRequired,
};
