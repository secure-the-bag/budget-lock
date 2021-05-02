import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Bills } from '../../../api/bill/Bill';
import { getLaterTransactions, updateBalances } from '../../utilities/UpdateBalances';
import { Transactions } from '../../../api/transaction/Transaction';

const DeleteUpcomingBill = (props) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDay = new Date(new Date().getFullYear(), 11, 31);
  lastDay.setHours(23, 59, 59, 999);

  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleDelete = () => {
    // delete transactions
    props.transactions.forEach(function (transaction) {
      const balanceOfPrevious = transaction.balance - transaction.amount;
      updateBalances(balanceOfPrevious, getLaterTransactions(transaction.date, props.allTransactions));
      Transactions.collection.remove(transaction._id);
    });

    // delete bill
    Bills.collection.remove(props.bill._id, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Data deleted successfully', 'success').then(() => {
          handleDeleteClose();
          // eslint-disable-next-line no-undef
          window.location.reload();
        })));
  };

  return (
      <Modal size='tiny'
             dimmer
             closeIcon
             open={deleteOpen}
             onClose={handleDeleteClose}
             onOpen={handleDeleteOpen}
             trigger={<Button basic compact content='Delete'/>}
      >
        <Modal.Header>Delete Bill</Modal.Header>
        <Modal.Content>
          Are you sure you want to delete selected bill and all upcoming transactions on this bill?
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
  );
};

DeleteUpcomingBill.propTypes = {
  bill: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
  allTransactions: PropTypes.array.isRequired,
};

export default DeleteUpcomingBill;
