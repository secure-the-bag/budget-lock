import React from 'react';
import { Segment, Form, Container, Button } from 'semantic-ui-react';
import startVerify from '../../api/verification/start-verify';
import checkVerify from '../../api/verification/check-verify';
import { Link, Redirect } from 'react-router-dom';

export class Verify extends React.Component {
 render() {
   return (
     <Container>
       <h1>
         Two-Factor Verification
       </h1>
       <Segment className={'signBody'}>
         <h3>
           Send Verification Code:
         </h3>
         <Button className={'sign-button'} onClick={startVerify}>
           Send Code
         </Button>
         <h3>
           Input 6-Digit Verification Code
         </h3>
         <Form onSubmit={checkVerify}>
           <Form.Input>

           </Form.Input>
           <Form.Button className={'sign-button'} content="Verify"/>

         </Form>
       </Segment>
     </Container>
   );
  }
}

export default Verify;
