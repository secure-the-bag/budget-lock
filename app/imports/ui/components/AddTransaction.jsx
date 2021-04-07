import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Button, Modal } from 'semantic-ui-react';
import {
  AutoForm,
  DateField,
  ErrorsField,
  NumField,
  SelectField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import PropTypes from 'prop-types';
import { Transactions } from '../../api/transaction/Transaction';
import { getCategoryChoices } from '../utilities/GlobalFunctions';
import { getNewBalance } from '../utilities/UpdateBalances';

const AddTransaction = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const makeSchema = () => new SimpleSchema({
    date: Date,
    payee: {
      type: String,
      optional: true,
    },
    category: String,
    amount: Number,
    name: {
      type: String,
      optional: true,
    },
    notes: {
      type: String,
      optional: true,
    },
  });

  const formSchema = makeSchema();
  const bridge = new SimpleSchema2Bridge(formSchema);

  const submit = (data) => {
    const { date, category } = data;
    const payee = (typeof data.payee === 'string') ? data.payee : '';
    const name = (typeof data.name === 'string') ? data.name : '';
    const notes = (typeof data.notes === 'string') ? data.notes : '';
    const amount = (['paycheck', 'starting'].includes(category)) ? data.amount : -data.amount;
    const owner = Meteor.user().username;
    const balance = props.transactions.length === 0 ? amount : getNewBalance(date, amount, props.transactions);
    Transactions.collection.insert({ name, date, payee, amount, balance, notes, owner, category },
      { removeEmptyStrings: false },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Data added successfully', 'success').then(() => {
            handleModalClose();
          });
        }
      });
  };

  return (
    <Modal as={AutoForm}
           schema={bridge}
           onSubmit={data => { submit(data); }}
           size={'mini'}
           closeIcon
           open={modalOpen}
           onClose={handleModalClose}
           onOpen={handleModalOpen}
           trigger={<Button>Add Transaction</Button>}
           style = {{ fontSize: '13px' }}
    >
      <Modal.Header>Add Transaction</Modal.Header>
      <Modal.Content>
        <DateField name='date'/>
        <TextField name='payee'
                   defaultValue=''/>
        <SelectField name='category'
                     options={getCategoryChoices()}/>
        <NumField name='amount'/>
        <TextField name='name'/>
        <TextField name='notes'/>
        <ErrorsField/>
      </Modal.Content>
      <Modal.Actions>
        <SubmitField value='Submit'/>
      </Modal.Actions>
    </Modal>
  );
};

AddTransaction.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default AddTransaction;
