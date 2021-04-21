import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const UpcomingBillsOverview = (props) => (
      <Table.Row>
        <Table.Cell>{props.transaction.date.toLocaleDateString()}</Table.Cell>
        <Table.Cell>{props.transaction.payee}</Table.Cell>
        <Table.Cell>{`$${Math.abs(props.transaction.amount).toFixed(2)}`}</Table.Cell>
      </Table.Row>
  );

UpcomingBillsOverview.propTypes = {
  transaction: PropTypes.object.isRequired,
};

export default (UpcomingBillsOverview);
