import React from 'react';
import { Button, Form, Icon, Modal, Table, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class TransactionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const categories = [
      { key: 'ccp', text: 'Credit Card Payment', value: 'Credit Card Payment' },
      { key: 'f', text: 'Fun', value: 'Fun' },
      { key: 'g', text: 'Groceries', value: 'Groceries' },
      { key: 'r', text: 'Restaurant', value: 'Restaurant' },
      { key: 'p', text: 'Paycheck', value: 'Paycheck' },
      { key: 's', text: 'Subscription', value: 'Subscription' },
    ];

    const modal = (e, text) => {
      // eslint-disable-next-line no-console
      console.log(text);
    };

    let amountCell;
    if (this.props.data.type === 'expenses') {
      amountCell = <Table.Cell style={{ color: 'red' }}>-${this.props.data.amount}</Table.Cell>;
    } else {
      amountCell = <Table.Cell>${this.props.data.amount}</Table.Cell>;
    }

    return (
        <Modal
          size={'tiny'}
          closeIcon
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
          onOpen={() => this.setState({ open: true })}
          trigger={
            <Table.Row onClick={(e) => modal(e, this.props.data.date)} style={{ cursor: 'pointer' }}>
              <Table.Cell>{this.props.data.date}</Table.Cell>
              <Table.Cell>{this.props.data.payee}</Table.Cell>
              <Table.Cell>{this.props.data.category}</Table.Cell>
              <Table.Cell>{this.props.data.notes}</Table.Cell>
              {amountCell}
              <Table.Cell>${this.props.data.balance}</Table.Cell>
            </Table.Row>
          }
          >
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Date</label>
                <input placeholder='Date'
                       defaultValue={this.props.data.date}/>
              </Form.Field>
              <Form.Field>
                <label>Payee</label>
                <input placeholder='Payee'
                       defaultValue={this.props.data.payee}/>
              </Form.Field>
              <Form.Field
                control={Select}
                label='Category'
                options={categories}
                placeholder='Category'
                defaultValue={this.props.data.category}
              />
              <Form.Field>
                <label>Amount</label>
                <input placeholder='$0.00'
                       defaultValue={this.props.data.amount}/>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={() => this.setState({ open: false })}>
              <Icon name='trash alternate outline'/> Delete
            </Button>
            <Button color='green' onClick={() => this.setState({ open: false })}>
              <Icon name='checkmark' /> Submit
            </Button>
          </Modal.Actions>
        </Modal>
    );
  }
}

/** Require a document to be passed to this component. */
TransactionItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default (TransactionItem);
