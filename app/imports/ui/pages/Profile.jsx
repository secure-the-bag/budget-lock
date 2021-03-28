import React from 'react';
import PropTypes from 'prop-types';
// import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Icon, Container, Button, Input, Loader, Form } from 'semantic-ui-react';
// import swal from 'sweetalert';
// import { Link } from 'react-router-dom';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
// import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-semantic';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readOnly: true,
      style: 'profile-input-disabled',
    };
  }

  // submit(data) {
  //   const { firstName, lastName, phone, _id } = data;
  //   Profile.update(_id, { $set: { firstName, lastName, phone } }, (error) => (error ?
  //     swal('Error', error.message, 'error') :
  //     swal('Success', 'Item updated successfully', 'success')));
  // }

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
            <Icon name='edit' />
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
    return (
      <Form className={this.state.style}>
        <Form.Field
          control={Input}
          label='First name'
          placeholder='First name'
          value='John'
          readOnly={this.state.readOnly}
        />
        <Form.Field
          control={Input}
          label='Last name'
          placeholder='Last name'
          value='Foo'
          readOnly={this.state.readOnly}
        />
        <Form.Field
          control={Input}
          label='Email'
          placeholder='john@foo.com'
          value='john@foo.com'
          readOnly={this.state.readOnly}
        />
        <Form.Field
          control={Input}
          label='Phone'
          placeholder='(123)-321-5321'
          value='(123)-321-5321'
          readOnly={this.state.readOnly}
        />
        <div align={'center'}>
          {!this.state.readOnly
            ? <Button type='submit'>Update</Button>
            : <div/>
          }
        </div>
      </Form>
    );
  }

  renderPage() {
    return (
      <Container style={{ padding: '5rem' }} >
        <div align={'right'}>
          {this.renderEditButton()}
        </div>
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
  // const sub = Meteor.subscribe('Profile');
  const sub = true;

  return {
    profile: [],
    // profile: Profile.find({}).fetch(),
    // ready: sub.ready(),
    ready: sub,

  };
})(Profile);
