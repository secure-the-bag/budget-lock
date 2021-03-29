import React from 'react';
import { Container, Divider, Grid, Input, Loader, Statistic, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import TransactionItem from '../components/TransactionItem';
import AddTransaction from '../components/AddTransaction';
import { Transactions } from '../../api/transaction/Transaction';

/**
 * User can add transactions by month, budget, due date, and type
 */
class TransactionsList extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Fetching Transactions</Loader>;
  }

  renderPage() {
    // categorize transactions by date
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const clearedTransactions = this.props.transactions.filter(({ date }) => date <= today);
    const scheduledTransactions = this.props.transactions.filter(({ date }) => date > today);

    // compute for balances, total expenses, and total income
    const total = (array) => array.reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    const totalBalance = this.props.transactions[0].balance;
    const currentBalance = clearedTransactions[0].balance;
    const scheduledExpenses = total(scheduledTransactions.filter(({ amount }) => amount < 0));
    const scheduledIncome = total(scheduledTransactions.filter(({ amount }) => amount >= 0));

    // convert to computed numbers to string
    const toStringColor = (value) => ((value < 0) ?
        { string: `-$${(Math.abs(value)).toFixed(2)}`, color: 'red' } :
        { string: `$${value.toFixed(2)}`, color: 'green' });

    return (
      <Container style={{ margin: '2rem 1rem' }}>
        <Grid id='transaction' container
              style={{ border: '0.2rem solid gray', padding: '2rem', borderRadius: '10px' }}>
          <Grid.Row verticalAlign='middle' columns={2} stretched centered>
            <Grid.Column width={8} textAlign='right'>
              <Statistic.Group size='tiny' widths={3}>
                <Statistic>
                  <Statistic.Value>{toStringColor(currentBalance).string}</Statistic.Value>
                  <p style={{ textAlign: 'center' }}>Current Balance</p>
                </Statistic>
                <Statistic>
                  <Statistic.Value>${scheduledIncome.toFixed(2)}</Statistic.Value>
                  <p style={{ textAlign: 'center' }}>Scheduled Income</p>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{toStringColor(scheduledExpenses).string}</Statistic.Value>
                  <p style={{ textAlign: 'center' }}>Scheduled Expenses</p>
                </Statistic>
              </Statistic.Group>
            </Grid.Column>
            <Grid.Column width={5} textAlign='left'>
              <Statistic size='small' color={toStringColor(totalBalance).color}>
                <Statistic.Value>{toStringColor(totalBalance).string}</Statistic.Value>
                <Statistic.Label>Total Balance</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>

          <Divider/>

          <Grid.Row columns={2} verticalAlign='bottom'>
            <Grid.Column floated='left'>
              <AddTransaction/>
            </Grid.Column>
            <Grid.Column textAlign='right' floated='right'>
              <Input size='mini' icon='search' placeholder='Search...' />
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
                <Table.Row>
                  <Table.Cell colSpan={6}><b>Scheduled Transactions</b></Table.Cell>
                </Table.Row>
                {scheduledTransactions.map((value, index) => <TransactionItem key={index} data={value}/>)}
                <Table.Row>
                  <Table.Cell colSpan={6}><b>Cleared Transactions</b></Table.Cell>
                </Table.Row>
                {clearedTransactions.map((value, index) => <TransactionItem key={index} data={value}/>)}
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
TransactionsList.propTypes = {
  transactions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Transaction documents.
  const sub = Meteor.subscribe(Transactions.userPublicationName);
  return {
    transactions: Transactions.collection.find({}, { sort: { date: -1 } }).fetch(),
    ready: sub.ready(),
  };
})(TransactionsList);
