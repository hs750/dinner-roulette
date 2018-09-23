import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';

class Home extends Component {
  render() {
    return (
      <Grid className="margin-top">
        <Grid.Row centered>
          <Grid.Column>
            <Header as="h1" icon textAlign="center">
              <Icon name="food" circular />
              Dinner Roulette
              <Header.Subheader>Spin the Wheel to Generate a Meal Plan.</Header.Subheader>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column textAlign="center">
            <Button.Group>
              <Link to="/dinner">
                <Button icon labelPosition="left">
                  View Dinners
                  <Icon name="search" />
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
        <Grid.Row centered>
          <Grid.Column textAlign="center">
            <Link to="/meal-plan">
              <Button primary>
                <Button.Content>Spin the Wheel!</Button.Content>
              </Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;