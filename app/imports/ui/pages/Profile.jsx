import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Icon, Container, Button, Loader, Grid, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Profiles } from '../../api/profile/Profile';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: true,
      style: 'profile-input-disabled',
    };
  }

  submit(data) {
    const { firstName, lastName, email, phone, _id } = data;
    Profiles.update(_id, { $set: { firstName, lastName, email, phone } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  onEdit() {
    this.setState({ readOnly: !this.state.readOnly });
    if (!this.state.readOnly) {
      this.setState({ style: 'profile-input-disabled' });
    } else {
      this.setState({ style: '' });
    }
  }

  renderEditButton() {
    if (this.state.readOnly) {
      return (
        <Button onClick={() => this.onEdit()}>
          <Button.Content>
            <Icon name='edit'/>
          </Button.Content>
        </Button>
      );
    }
    return (
      <Button onClick={() => this.onEdit()}>
        <Button.Content>Cancel</Button.Content>
      </Button>
    );
  }

  renderForm() {
    const bridge = new SimpleSchema2Bridge(Profiles.schema);

    return (
      <div>
        <AutoForm schema={bridge}
                  onSubmit={data => this.submit(data)}
                  model={this.props.profile[0]}
                  className={this.state.style}
        >
          <Segment>
            <div align={'right'}>
              {this.renderEditButton()}
            </div>

            <TextField
              label='First Name'
              name='firstName'
              disabled={this.state.readOnly}
            />
            <TextField
              label='Last Name'
              name='lastName'
              disabled={this.state.readOnly}
            />
            <TextField
              label='Email'
              name='email'
              disabled={this.state.readOnly}
            />
            <TextField
              label='Phone Number'
              name='phoneNumber'
              disabled={this.state.readOnly}
            />
            <div align='center'>
              {!this.state.readOnly
                ? <SubmitField value='Update'/>
                : <div/>
              }
            </div>
            <ErrorsField/>
            <HiddenField name='owner'/>
          </Segment>
        </AutoForm>
      </div>
    );
  }

  renderPage() {
    return (
      <Container style={{ padding: '5rem' }}>
        {this.renderForm()}
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Profile.propTypes = {
  profile: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profile documents.
  const sub = Meteor.subscribe(Profiles.userPublicationName);
  return {
    profile: Profiles.collection.find({}).fetch(),
    ready: sub.ready(),
  };
})(Profile);
