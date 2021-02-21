import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';

const formSchema = new SimpleSchema({
  date: Date,
  payee: String,
  category: {
    type: String,
    allowedValues: ['Credit Card Payment', 'Fun', 'Groceries', 'Restaurants', 'Paycheck', 'Subscriptions'],
  },
  amount: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class AddTransaction extends React.Component {
  render() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Transaction</Header>
            <AutoForm schema={bridge}>
              <Segment>
                <DateField name='date' />
                <TextField name='payee' />
                <SelectField name='category' />
                <NumField name='amount' />
                <SubmitField/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddTransaction;
