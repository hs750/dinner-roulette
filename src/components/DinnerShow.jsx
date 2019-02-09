import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  Button, Dimmer, Grid, Header, Icon, Loader, Segment,
} from 'semantic-ui-react';

import { deleteDinner as dd } from '../actions/DinnerActions';
import DinnerPropType from '../proptypes/DinnerPropTypes';
import HistoryPropType from '../proptypes/HistoryPropTypes';

class DinnerShow extends Component {
  constructor(props) {
    super(props);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount() {
    const { dinner, match, fetchDinner } = this.props;
    if (!dinner) {
      const { id } = match.params;
      fetchDinner(id);
    }
  }

  onDeleteClick() {
    const { match: { params: { id } }, deleteDinner, history } = this.props;
    deleteDinner(id, () => {
      history.push('/dinner');
    });
  }

  render() {
    const { dinner } = this.props;
    if (!dinner) {
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
              <Button
                icon
                negative
                labelPosition="right"
                onClick={this.onDeleteClick}
              >
                Delete Dinner
                <Icon name="delete" />
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2">
              {dinner.title}
              <Header.Subheader>
                {dinner.description}
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
    deleteDinner: dd,
  }, dispatch);
}

function mapStateToProps(state, ownProps) {
  return {
    dinner: state.dinners[ownProps.match.params.id],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DinnerShow);

DinnerShow.propTypes = {
  dinner: DinnerPropType.isRequired,
  history: HistoryPropType.isRequired,
  fetchDinner: PropTypes.func.isRequired,
  deleteDinner: PropTypes.func.isRequired,
  match: PropTypes.shape(
    {
      params: PropTypes.shape(
        {
          id: PropTypes.number.isRequired,
        },
      ),
    },
  ).isRequired,
};
