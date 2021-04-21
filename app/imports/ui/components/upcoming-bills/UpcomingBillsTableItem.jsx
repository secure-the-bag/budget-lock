import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const UpcomingBillsTableItem = (props) => {
  const balance = props.transaction.balance > 0 ? `$${props.transaction.balance.toFixed(2)}` : `-$${Math.abs(props.transaction.balance).toFixed(2)}`;
  return (
      <Table.Row>
        <Table.Cell>{props.transaction.date.toLocaleDateString()}</Table.Cell>
        <Table.Cell>{`$${Math.abs(props.transaction.amount).toFixed(2)}`}</Table.Cell>
        <Table.Cell>{balance}</Table.Cell>
      </Table.Row>
  );
};

UpcomingBillsTableItem.propTypes = {
  transaction: PropTypes.object.isRequired,
};

export default (UpcomingBillsTableItem);
