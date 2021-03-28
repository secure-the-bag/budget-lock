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
  }

  renderEditButton() {
    if (this.state.readOnly) {
      return (
        <Button animated='fade' onClick={() => this.onEdit()}>
          <Button.Content visible>
            <Icon name='edit' />
          </Button.Content>
          <Button.Content hidden>Edit</Button.Content>
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
    if (this.state.readOnly) {
      return (
        <Form className={'profile-input-disabled'}>
          <Form.Field
            control={Input}
            label='First name'
            placeholder='First name'
            value='John'
            readOnly
          />
          <Form.Field
            control={Input}
            label='Last name'
            placeholder='Last name'
            value='Foo'
            readOnly
          />
          <Form.Field
            control={Input}
            label='Email'
            placeholder='john@foo.com'
            value='john@foo.com'
            readOnly
          />
          <Form.Field
            control={Input}
            label='Phone'
            placeholder='(123)-321-5321'
            value='(123)-321-5321'
            readOnly
          />
        </Form>
      );
    } return (
      <Form>
        <Form.Field
          control={Input}
          label='First name'
          placeholder='First name'
          value='John'
          readOnly
        />
        <Form.Field
          control={Input}
          label='Last name'
          placeholder='Last name'
          value='Foo'
        />
        <Form.Field
          control={Input}
          label='Email'
          placeholder='john@foo.com'
          value='john@foo.com'
        />
        <Form.Field
          control={Input}
          label='Phone'
          placeholder='(123)-321-5321'
          value='(123)-321-5321'
        />
        <div align={'center'}>
          <Button type='submit'>Submit</Button>
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
  const sub = 'filler';

  return {
    profile: [],
    // profile: Profile.find({}).fetch(),
    // ready: sub.ready(),
    ready: true,

  };
})(Profile);
