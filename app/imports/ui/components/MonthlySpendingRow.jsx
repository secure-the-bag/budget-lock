import React from 'react';
import { Table, Modal, Button, Header, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import {
  AutoForm,
  ErrorsField, LongTextField,
  SelectField,
  TextField,
} from 'uniforms-semantic';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { getCategoryEquivalent, getCategoryChoices } from '../utilities/GlobalFunctions';
import { Transactions } from '../../api/transaction/Transaction';

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

class MonthlySpendingRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  // On submit, insert data.
  submit(data, formRef) {
    const { date, category, amount } = data;
    const balance = 0;
    const owner = Meteor.user().username;
    const payee = (typeof data.payee === 'string') ? data.payee : '';
    const name = (typeof data.name === 'string') ? data.name : '';
    const notes = (typeof data.notes === 'string') ? data.notes : '';
    const react = this;

    Transactions.collection.update(this.props.data._id,
      { $set: { name, date, payee, amount, balance, notes, owner, category } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Transaction updated successfully', 'success').then(() => {
            react.setState({ open: false });
            formRef.reset();
            // eslint-disable-next-line no-undef
            window.location.reload();
          });
        }
      });
  }

  render() {

    let formRef = null;

    return (
      <Modal
        size={'tiny'}
        closeIcon
        open={this.state.open}
        trigger={
          <Table.Row style={{ cursor: 'pointer' }}>
            <Table.Cell>{this.props.data.date}</Table.Cell>
            <Table.Cell>{this.props.data.payee}</Table.Cell>
            <Table.Cell>{getCategoryEquivalent(this.props.data.category, 'label')}</Table.Cell>
            <Table.Cell style={{ color: 'red' }}>-${Math.abs(this.props.data.amount).toFixed(2)}</Table.Cell>
          </Table.Row>
        }
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
      >
        <Header icon='money bill alternate outline' content='Edit Transaction' />
        <Modal.Content>
          <AutoForm ref={ref => { formRef = ref; }}
                    schema={bridge}
                    model={this.props.data}
                    onSubmit={data => { this.submit(data, formRef); }}>
            <TextField name='date'/>
            <TextField name='payee'/>
            <SelectField name='category'
                         options={getCategoryChoices()}/>
            <TextField name='amount'/>
            <LongTextField name='notes'/>
            <Button color='green'>
              <Icon name='checkmark' /> Update
            </Button>
            <ErrorsField/>
          </AutoForm>
        </Modal.Content>
      </Modal>
    );
  }
}

/** Require a document to be passed to this component. */
MonthlySpendingRow.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MonthlySpendingRow;
