import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Icon, Container, Button, Loader, Segment, Modal, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profile/Profile';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: true,
      style: 'profile-input-disabled',
      id: '',
      firstName: '',
      lastName: '',
      phone: '',
      passwordModalOpen: false,
      oldPassword: '',
      newPassword: '',
      verifyPassword: '',
    };
  }

  setData(data) {
    const { firstName, lastName, phone, _id } = data;
    this.setState({ firstName: firstName });
    this.setState({ lastName: lastName });
    this.setState({ phone: phone });
    this.setState({ id: _id });
  }

  submit() {
    Profiles.collection.update(this.state.id,
      { $set: { firstName: this.state.firstName, lastName: this.state.lastName, email: this.props.profile[0].email, phone: this.state.phone } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Profile Updated', 'success')));
    this.setState({ readOnly: true });
    this.setState({ style: 'profile-input-disabled' });
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

  verifyPassword() {
    if (this.state.newPassword !== this.state.verifyPassword) {
      swal('Error', 'New Password does not match.', 'error').then();
      return;
    }
    if (this.state.newPassword.length < 5 || this.state.verifyPassword.length < 5) {
      swal('Error', 'New password must be 5 characters or longer.', 'error').then();
      return;
    }
    const react = this;
    Accounts.changePassword(this.state.oldPassword, this.state.newPassword, function (err) {
      if (!err) {
        swal('Success', 'Password Updated', 'success').then();
        react.setState({ passwordModalOpen: false });
      } else {
        swal('Error', `${err.message}\n Old password incorrect.`, 'error').then();
      }
    });
  }

  onChangeOldPW(e, data) {
    this.setState({ oldPassword: data.value });
  }

  onChangeNewPW(e, data) {
    this.setState({ newPassword: data.value });
  }

  onChangeVerifyNewPW(e, data) {
    this.setState({ verifyPassword: data.value });
  }

  handleDelete = () => {
    const userToRemove = Profiles.collection.find({}, { fields: { email: 1 } })
        .fetch();
    Profiles.collection.remove(userToRemove[0]._id);
    Meteor.users.remove(Meteor.userId());
    swal('Successfully deleted!')
        .then(() => {
          // eslint-disable-next-line no-undef
          window.location = '/#/';
        });
  };

  handleClick = () => swal({
    text: 'Are you sure you want to delete your account',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
      .then((willDelete) => {
        if (willDelete) {
          this.handleDelete();
        } else {
          swal('Canceled deleting your account');
        }
      });

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
      <div style={{ paddingBottom: '2rem' }}>
        <AutoForm schema={bridge}
                  onSubmit={data => this.setData(data)}
                  model={this.props.profile[0]}
                  className={this.state.style}
        >
          <Segment
            style={{ border: '0.2rem solid gray', padding: '2rem', borderRadius: '10px' }}
          >
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
              label='Phone Number'
              name='phoneNumber'
              disabled={this.state.readOnly}
            />
            <div align='center'>
              {!this.state.readOnly
                ? <SubmitField value='Update'
                    onClick={() => this.submit()}/>
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
      <Container stretched style={{ padding: '5rem' }}>
        {this.renderForm()}
        <Modal
          style={{ border: '0.2rem solid gray', padding: '2rem', borderRadius: '10px' }}
          closeIcon
          onClose={() => this.setState({ passwordModalOpen: false })}
          onOpen={() => this.setState({ passwordModalOpen: true })}
          open={this.state.passwordModalOpen}
          trigger={
            <div align={'center'}>
              <Button>
                Change Password
              </Button>
            </div>
          }
        >
          <Modal.Header>Change Password</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Input label='Current Password' type='password' required
                          autoComplete='current-password'
                          onChange={(e, data) => this.onChangeOldPW(e, data)}/>
              <Form.Input label='New Password' type='password' required
                          autoComplete='new-password'
                          placeholder='New password must be 5 characters or longer'
                          onChange={(e, data) => this.onChangeNewPW(e, data)}/>
              <Form.Input label='Verify New Password' type='password' required
                          placeholder='New password must be 5 characters or longer'
                          onChange={(e, data) => this.onChangeVerifyNewPW(e, data)}/>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
                content="Update Password"
                labelPosition='right'
                icon='checkmark'
                onClick={() => this.verifyPassword()}
                positive
            />
          </Modal.Actions>
        </Modal>
        <br/>
        <div align={'center'}>
          <Button negative onClick={this.handleClick}>
            Delete Account
          </Button>
        </div>
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
