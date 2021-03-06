import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Container, Table, Header, Loader, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ProfileItem from '../components/ProfileItem';
import { Profiles } from '../../api/profile/Profile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListProfilesAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container style={{ margin: '2rem 1rem' }}>
          <Grid style={{ border: '0.2rem solid gray', padding: '2rem', borderRadius: '10px' }}>
            <Grid.Row><Header as="h2" textAlign="center">All Budget Lock Users</Header></Grid.Row>
            <Divider/>
            <Table celled style={{ paddingLeft: '0rem', paddingRight: '0rem' }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>Delete?</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.profiles.map((profile) => <ProfileItem key={profile._id} user={profile}/>)}
              </Table.Body>
            </Table>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListProfilesAdmin.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profiles documents.
  const subscription = Meteor.subscribe(Profiles.adminPublicationName);
  const subscription2 = Meteor.subscribe('userList');
  return {
    profiles: Profiles.collection.find()
        .fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ListProfilesAdmin);
