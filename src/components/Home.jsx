import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Grid, Header, Icon,
} from 'semantic-ui-react';

const Home = () => (
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
              Manage Dinners
              <Icon name="search" />
            </Button>
          </Link>
          <Button.Or />
          <Link to="/meal-plan">
            <Button icon labelPosition="right">
              View Meal Plan
              <Icon name="calendar alternate outline" />
            </Button>
          </Link>
        </Button.Group>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Home;
