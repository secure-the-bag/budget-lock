import React from 'react';
import { Table, Modal, Button, Header, Icon, Form, Select } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { getCategoryEquivalent } from '../utilities/GlobalFunctions';

class MonthlySpendingRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {

    const options = [
      { key: 'm', text: 'Shopping', value: 'Shopping' },
      { key: 'f', text: 'Fun', value: 'Fun' },
      { key: 'o', text: 'Restaurants', value: 'Restaurants' },
    ];

    const modal = (e, text) => {
      console.log('clicked');
      console.log(text);
    };

    return (
      <Modal
        size={'tiny'}
        closeIcon
        open={this.state.open}
        trigger={
          <Table.Row onClick={(e) => modal(e, this.props.data.text)}
                     style={{ cursor: 'pointer' }}>
            <Table.Cell>{this.props.data.date}</Table.Cell>
            <Table.Cell>{this.props.data.text}</Table.Cell>
            <Table.Cell>{getCategoryEquivalent(this.props.data.category, 'label')}</Table.Cell>
            <Table.Cell style={{ color: 'red' }}>-${this.props.data.price}</Table.Cell>
          </Table.Row>
        }
        onClose={() => this.setState({ open: false })}
        onOpen={() => this.setState({ open: true })}
      >
        <Header icon='money bill alternate outline' content='Edit Transaction' />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Date</label>
              <input placeholder='Date'
                     defaultValue={this.props.data.date}/>
            </Form.Field>
            <Form.Field>
              <label>Store</label>
              <input placeholder='Store'
                     defaultValue={this.props.data.text}
              />
            </Form.Field>
            <Form.Field>
              <label>Amount</label>
              <input placeholder='$0.00'
                     defaultValue={this.props.data.price}/>
            </Form.Field>
            <Form.Field
              control={Select}
              label='Category'
              options={options}
              placeholder='Shopping'
            />
            <Button type='submit'>Submit</Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' onClick={() => this.setState({ open: false })}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' onClick={() => this.setState({ open: true })}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

/** Require a document to be passed to this component. */
MonthlySpendingRow.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MonthlySpendingRow;
