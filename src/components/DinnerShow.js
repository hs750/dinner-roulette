import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button, Dimmer, Grid, Header, Icon, Loader, Segment } from 'semantic-ui-react';

import { deleteDinner, fetchDinner } from '../actions/DinnerActions';

class DinnerShow extends Component {
  componentDidMount() {
    if (!this.props.dinner) {
      const { id } = this.props.match.params;
      this.props.fetchDinner(id);
    }
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deleteDinner(id, () => {
      this.props.history.push('/dinner');
    });
  }

  render() {
    if (!this.props.dinner) {
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
              <Link to="/dinner">
                <Button icon labelPosition="left">
                  Back to Dinners
                  <Icon name="arrow left" />
                </Button>
              </Link>
              <Button.Or />
              <Button icon negative labelPosition="right"
                onClick={this.onDeleteClick.bind(this)}>
                Delete Dinner
                <Icon name="delete" />  
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2">
              {this.props.dinner.title}
              <Header.Subheader>
                {this.props.dinner.description}
              </Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteDinner: deleteDinner,
    fetchDinner: fetchDinner
  }, dispatch);
}

function mapStateToProps(state, ownProps) {
  return {
    dinner: state.dinners[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DinnerShow);