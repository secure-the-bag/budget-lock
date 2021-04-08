import React, { useState } from 'react';
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
  SelectField,
  TextField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { getCategoryChoices, getCategoryEquivalent, validateOptionalFields } from '../../utilities/GlobalFunctions';
import { getNewBalance } from '../../utilities/UpdateBalances';
import { Transactions } from '../../../api/transaction/Transaction';

const TransactionItem = (props) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getNumFormat = (num) => ((num < 0) ?
        <Table.Cell style={{ color: 'red' }}>-${Math.abs(num).toFixed(2)}</Table.Cell> :
        <Table.Cell>${num.toFixed(2)}</Table.Cell>);

  const categoryLabel = getCategoryEquivalent(props.data.category, 'label');

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

  const submit = (transaction) => {
    const { date, category, _id } = transaction;
    const { payee, name, notes } = validateOptionalFields(transaction);
    const amount = (['paycheck', 'starting'].includes(category)) ? Math.abs(transaction.amount) : -Math.abs(transaction.amount);
    const owner = Meteor.user().username;
    const amountDifference = Number((amount - props.data.amount).toFixed(2));
    const balance = props.transactions.length === 1 ? amount :
        getNewBalance(date, amountDifference, props.transactions);
    Transactions.collection.update(_id,
        { $set: { name, date, payee, amount, balance, notes, owner, category } },
        { removeEmptyStrings: false },
        (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Data updated successfully', 'success').then(() => {
              setModalOpen(false);
            })));
  };

  return (
      <Modal as={AutoForm}
             schema={bridge}
             onSubmit={data => { submit(data); }}
             model={props.data}
             size={'mini'}
             closeIcon
             open={modalOpen}
             onClose={() => setModalOpen(false)}
             onOpen={() => setModalOpen(true)}
             trigger={
               <Table.Row style={{ cursor: 'pointer' }}>
                 <Table.Cell>{props.data.date.toLocaleDateString()}</Table.Cell>
                 <Table.Cell>{props.data.payee}</Table.Cell>
                 <Table.Cell>{categoryLabel}</Table.Cell>
                 <Table.Cell>{props.data.notes}</Table.Cell>
                 {getNumFormat(props.data.amount)}
                 {getNumFormat(props.data.balance)}
               </Table.Row>
             }
             style = {{ fontSize: '13px' }}
      >
        <Modal.Header>Edit Transaction</Modal.Header>
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
          <Button size='tiny'>Edit</Button>
        </Modal.Actions>
      </Modal>
  );
};

/** Require a document to be passed to this component. */
TransactionItem.propTypes = {
  data: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
};

export default (TransactionItem);
