import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';
import { Profiles } from '../../api/profile/Profile';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', phoneNumber: '', email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { firstName, lastName, phoneNumber, email, password } = this.state;
    Accounts.createUser({ firstName, lastName, phoneNumber, username: email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        Profiles.collection.insert({ firstName, lastName, email, phoneNumber, owner: email }, (error) => {
          if (error) {
            this.setState({ error: err.reason });
          } else {
            this.setState({ error: '', redirectToReferer: true });
          }
        });
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Display the signup form. Redirect to add page after successful registration and login. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/add' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <Container id="signup-page">
        <Grid.Column width={4}>
          <Image centered size='small' src="/images/icon-final.png"/>
        </Grid.Column>
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h1" textAlign="center" style={{ paddingBottom: '10px' }}>
              Budget Lock
            </Header>
            <Form onSubmit={this.submit}>
              <Segment className={'signBody'} stacked>
                <Header as="h2" textAlign="center" style={{ paddingTop: '20px', paddingBottom: '10px' }}>
                  Create An Account
                </Header>
                <Form.Group widths='equal'>
                  <Form.Input
                    fluid label='First Name'
                    name='firstName'
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid label='Last Name'
                    name='lastName'
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                />
                <div align='center'>
                  <Form.Button className={'sign-button'} content="Create Account"/>
                </div>
              </Segment>
            </Form>
            <Segment align='center' textAlign='center' style={{ marginTop: '-10px' }}>
              Verify by Twilio <a href="https://www.twilio.com/legal/tos">Terms & Policy</a> <br/>
              Already have an account? Login <Link to="/signin">here</Link>
            </Segment>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Registration was not successful"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
