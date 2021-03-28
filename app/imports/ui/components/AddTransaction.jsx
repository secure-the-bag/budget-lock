import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Button, Modal } from 'semantic-ui-react';
import {
  AutoForm,
  DateField,
  ErrorsField,
  LongTextField,
  NumField,
  SelectField,
  SubmitField,
  TextField,
} from 'uniforms-semantic';
import { Transactions } from '../../api/transaction/Transaction';
import { getCategoryChoices } from '../utilities/GlobalFunctions';

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

class AddTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  // Handles the state of the modal (close or open)
  handleModalOpen = () => this.setState({ modalOpen: true });

  handleModalClose = () => this.setState({ modalOpen: false });

  // On submit, insert data.
  submit(data, formRef) {
    const { date, category } = data;
    const payee = (typeof data.payee === 'string') ? data.payee : '';
    const name = (typeof data.name === 'string') ? data.name : '';
    const notes = (typeof data.notes === 'string') ? data.notes : '';
    const amount = (['paycheck', 'starting'].includes(category)) ? data.amount : -data.amount;
    const owner = Meteor.user().username;
    Transactions.collection.insert({ name, date, payee, amount, balance: 0, notes, owner, category },
        { removeEmptyStrings: false },
        (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Data added successfully', 'success').then(() => {
          this.handleModalClose();
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
      <Modal size='mini'
             closeIcon
             open={this.state.modalOpen}
             onClose={this.handleModalClose}
             onOpen={this.handleModalOpen}
             trigger={<Button>Add Transaction</Button>}
      >
        <Modal.Header>Add Transaction</Modal.Header>
        <Modal.Content>
          <AutoForm ref={ref => { formRef = ref; }}
                    schema={bridge}
                    onSubmit={data => { this.submit(data, formRef); }}>
            <DateField name='date'/>
            <TextField name='payee'
                       defaultValue=''/>
            <SelectField name='category'
                         options={getCategoryChoices()}/>
            <NumField name='amount'/>
            <TextField name='name'/>
            <LongTextField name='notes'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </AutoForm>
        </Modal.Content>
      </Modal>
    );
  }
}

export default AddTransaction;
