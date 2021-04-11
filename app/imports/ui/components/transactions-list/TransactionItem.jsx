import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Icon, Modal, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import {
  AutoForm,
  DateField,
  ErrorsField,
  NumField,
  SelectField, SubmitField,
  TextField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { getCategoryChoices, getCategoryEquivalent, validateOptionalFields } from '../../utilities/GlobalFunctions';
import { getNewBalance } from '../../utilities/UpdateBalances';
import { Transactions } from '../../../api/transaction/Transaction';

const TransactionItem = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const transaction = props.data;
  const transactions = props.transactions;

  const getNumFormat = (num) => ((num < 0) ?
        <Table.Cell style={{ color: 'red' }}>-${Math.abs(num).toFixed(2)}</Table.Cell> :
        <Table.Cell>${num.toFixed(2)}</Table.Cell>);

  const categoryLabel = getCategoryEquivalent(transaction.category, 'label');

  const formSchema = new SimpleSchema({
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

  const bridge = new SimpleSchema2Bridge(formSchema);

  const submit = (input) => {
    const { date, category, _id } = input;
    const { payee, name, notes } = validateOptionalFields(input);
    const amount = (['paycheck', 'starting'].includes(category)) ? Math.abs(input.amount) : -Math.abs(input.amount);
    const owner = Meteor.user().username;
    const amountDifference = Number((amount - transaction.amount).toFixed(2));
    const balance = props.transactions.length === 1 ? amount :
        getNewBalance(date, amountDifference, transactions);
    Transactions.collection.update(_id,
        { $set: { name, date, payee, amount, balance, notes, owner, category } },
        { removeEmptyStrings: false },
        (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Data updated successfully', 'success').then(() => {
              handleModalClose();
            })));
  };

  const handleDelete = () => {
    Transactions.collection.remove(transaction._id, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Data deleted successfully', 'success').then(() => {
          handleDeleteClose();
          handleModalClose();
        });
      }
    });
  };

  return (
      <Modal size={'mini'}
             closeIcon
             open={modalOpen}
             onClose={handleModalClose}
             onOpen={handleModalOpen}
             trigger={
               <Table.Row style={{ cursor: 'pointer' }}>
                 <Table.Cell>{transaction.date.toLocaleDateString()}</Table.Cell>
                 <Table.Cell>{transaction.payee}</Table.Cell>
                 <Table.Cell>{categoryLabel}</Table.Cell>
                 <Table.Cell>{transaction.notes}</Table.Cell>
                 {getNumFormat(transaction.amount)}
                 {getNumFormat(transaction.balance)}
               </Table.Row>
             }
      >
        <Modal.Header>Edit Transaction</Modal.Header>
        <Modal.Content>
          <AutoForm schema={bridge}
                    onSubmit={data => { submit(data); }}
                    model={props.data}
                    style = {{ fontSize: '13px' }}
          >
            <DateField name='date'/>
            <TextField name='payee'
                       defaultValue=''/>
            <SelectField name='category'
                         options={getCategoryChoices()}/>
            <NumField name='amount'/>
            <TextField name='name'/>
            <TextField name='notes'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </AutoForm>
        </Modal.Content>
        <Modal.Actions>
          <Button icon
                  negative
                  onClick={() => handleDeleteOpen()}>
            <Icon name='trash alternate outline'/>
          </Button>
        </Modal.Actions>

        <Modal size='tiny'
               dimmer
               closeIcon
               open={deleteOpen}
               onClose={handleDeleteClose}
               onOpen={handleDeleteOpen}
        >
          <Modal.Header>Delete Transaction</Modal.Header>
          <Modal.Content>
            Are you sure you want to delete selected transaction?
          </Modal.Content>
          <Modal.Actions>
            <Button icon
                    size='tiny'
                    negative
                    labelPosition='right'
                    onClick={() => handleDelete()}>
              Delete
              <Icon name='trash alternate outline'/>
            </Button>
            <Button icon
                    size='tiny'
                    labelPosition='right'
                    onClick={() => handleDeleteClose()}>
              Cancel
              <Icon name='x'/>
            </Button>
          </Modal.Actions>
        </Modal>
      </Modal>
  );
};

/** Require a document to be passed to this component. */
TransactionItem.propTypes = {
  data: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
};

export default (TransactionItem);
