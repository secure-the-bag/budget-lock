import React from 'react';
import { Grid, Image, Button, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Profile extends React.Component {
  render() {
    return (
      <Grid stackable id='profile' verticalAlign='middle' textAlign='center'>
        <Grid.Row>
          <Header as={'h1'}>Profile
          </Header>
        </Grid.Row>
        <Grid.Row>
          Bills
        </Grid.Row>
      </Grid>
    );
  }
}

export default Profile;
