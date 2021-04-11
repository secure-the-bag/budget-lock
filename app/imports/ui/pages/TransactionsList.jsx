import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Divider, Grid, Loader, Table } from 'semantic-ui-react';
import { Transactions } from '../../api/transaction/Transaction';
import AddTransaction from '../components/transactions-list/AddTransaction';
import TransactionsSummary from '../components/transactions-list/TransactionsSummary';
import TransactionItem from '../components/transactions-list/TransactionItem';

const TransactionsList = (props) => {
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const getData = () => {
    // filter transactions
    const cleared = props.transactions.filter(({ date }) => date <= today);
    const scheduled = props.transactions.filter(({ date }) => date > today);

    // compute balances, total expenses, and total income
    const sum = (array) => array.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    const total = (props.transactions.length === 0) ? 0 : props.transactions[0].balance;
    const current = (cleared.length === 0) ? 0 : cleared[0].balance;
    const scheduledExpenses = sum(scheduled.filter(({ amount }) => amount < 0));
    const scheduledIncome = sum(scheduled.filter(({ amount }) => amount >= 0));

    return {
      cleared,
      scheduled,
      summary: { total, current, scheduledExpenses, scheduledIncome },
    };
  };

  const data = getData();
  const transactions = props.transactions;

  const showScheduledRow = data.scheduled.length === 0 ? null : (
      <Table.Row>
        <Table.Cell colSpan={6}><b>Scheduled Transactions</b></Table.Cell>
      </Table.Row>
  );

  const showClearedRow = data.cleared.length === 0 ? null : (
      <Table.Row>
        <Table.Cell colSpan={6}><b>Cleared Transactions</b></Table.Cell>
      </Table.Row>
  );

  return !props.ready ?
      <Loader active>Fetching Transactions</Loader> :
      (
          <Container style={{ margin: '2rem 1rem' }}>
            <Grid id='transaction' container
                  style={{ border: '0.2rem solid gray', padding: '2rem', borderRadius: '10px' }}>
              <TransactionsSummary data={data.summary}/>

              <Divider/>

              <Grid.Row verticalAlign='bottom'>
                <Grid.Column textAlign='right' floated='right'>
                  <AddTransaction transactions={transactions}/>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Table singleLine>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                      <Table.HeaderCell width={3}>Payee</Table.HeaderCell>
                      <Table.HeaderCell width={4}>Category</Table.HeaderCell>
                      <Table.HeaderCell width={3}>Notes</Table.HeaderCell>
                      <Table.HeaderCell width={2}>Amount</Table.HeaderCell>
                      <Table.HeaderCell width={2}>Balance</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {showScheduledRow}
                    {data.scheduled.map(
                        (value, index) => <TransactionItem key={index} data={value} transactions={transactions}/>,
                        )}
                    {showClearedRow}
                    {data.cleared.map(
                        (value, index) => <TransactionItem key={index} data={value} transactions={transactions}/>,
                        )}
                  </Table.Body>
                </Table>
              </Grid.Row>
            </Grid>
          </Container>
      );
};

TransactionsList.propTypes = {
  transactions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const ready = Meteor.subscribe(Transactions.userPublicationName).ready();
  const transactions = Transactions.collection.find({}, { sort: { date: -1 } }).fetch();
  return {
    transactions,
    ready,
  };
})(TransactionsList);
