import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Button, Grid, Modal } from 'semantic-ui-react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { AutoForm, DateField, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import {
  getCategoryChoicesNoStarting,
  frequencyChoices,
  getDateUntil,
  insertNewBillTransactions,
} from '../../utilities/GlobalFunctions';
import { Bills } from '../../../api/bill/Bill';

const AddUpcomingBill = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDay = new Date(new Date().getFullYear(), 11, 31);
  lastDay.setHours(23, 59, 59, 999);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const formSchema = new SimpleSchema({
    fixedAmount: Number,
    payee: String,
    category: String,
    frequency: String,
    start: Date,
    until: {
      type: Date,
      optional: true,
    },
  });

  const bridge = new SimpleSchema2Bridge(formSchema);

  const submit = (bill) => {
    const billInput = {};
    billInput.fixedAmount = bill.fixedAmount;
    billInput.payee = bill.payee;
    billInput.category = bill.category;
    billInput.frequency = bill.frequency;
    billInput.start = bill.start;
    billInput.until = getDateUntil(bill.start, bill.until, bill.frequency);
    billInput.owner = Meteor.user().username;
    insertNewBillTransactions(billInput, props.transactions);

    Bills.collection.insert(billInput, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Bill added successfully', 'success').then(() => {
          handleModalClose();
        })));
  };

  return (
      <Modal as={AutoForm}
             schema={bridge}
             onSubmit={bill => { submit(bill); }}
             size={'tiny'}
             closeIcon
             open={modalOpen}
             onClose={handleModalClose}
             onOpen={handleModalOpen}
             trigger={
               <Button basic size={'mini'} icon={'add'}/>
             }
             style = {{ fontSize: '13px' }}
             >
        <Modal.Header>Add New Bill</Modal.Header>
        <Modal.Content>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column as={NumField} name='fixedAmount'/>
              <Grid.Column as={TextField} name='payee'/>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column as={SelectField}
                           name='category'
                           options={getCategoryChoicesNoStarting}
              />
              <Grid.Column as={SelectField}
                           name='frequency'
                           options={frequencyChoices}
              />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column as={DateField}
                           label='Start Date'
                           name='start'
                           min={today}
                           max={lastDay}
              />
              <Grid.Column>
                <DateField label='End Date' name='until' min={today} max={lastDay} defaultValue={today}/>
                Note: If no end date, only 12 transactions will be added.
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <ErrorsField/>
        </Modal.Content>
        <Modal.Actions>
          <SubmitField value='Submit'/>
        </Modal.Actions>
      </Modal>
  );
};

AddUpcomingBill.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default AddUpcomingBill;
