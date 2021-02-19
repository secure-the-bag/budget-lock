import React from 'react';
import { Grid, Image, Button, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
    render() {
        return (
            <Grid stackable id='landing-page' verticalAlign='middle' textAlign='center'>
                <Grid.Row className={'landingTopPic'}>
                    <Grid.Column width={4}>
                        <Image centered size='medium' src="/images/icon-final.png"/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className={'landingTop'}>
                    <Grid.Column width={8}>
                        <h1>Welcome to Budget Lock</h1>
                        <p>Get started on organizing your finances with us!</p>
                        
                        <Button basic as={NavLink} exact
                                to="/signin">Sign In</Button>
                        <Button as={NavLink} exact
                                to="/signup">Sign Up</Button>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row className={'landingBottom'}>
                    <Grid.Column width={5}>
                        <Image centered size='small' src="/images/image1.png"/>
                        <h1>Track Your Bills</h1>
                        <p>Keep all bills and transactions in one place</p>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Image centered size='small' src="/images/image2.png"/>
                        <h1>View Budget Statistics</h1>
                        <p>See trends and breakdowns on your purchases</p>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Image centered size='small' src="/images/image3.png"/>
                        <h1>Ensure Safe Security</h1>
                        <p>Safely store your budgets on the cloud</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default Landing;
