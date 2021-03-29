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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const scheduledTransactions = this.props.transactions.filter(({ date }) => date > today);

    const clearedTransactions = this.props.transactions.filter(({ date }) => date <= today);

    return (
        <Container style={{ margin: '2rem 1rem' }}>
          <Grid id='transaction' container
                style={{ border: '0.2rem solid gray', padding: '2rem', borderRadius: '10px' }}>
            <Grid.Row verticalAlign='middle' columns={2} stretched centered>
              <Grid.Column width={8} textAlign='right'>
                <Statistic.Group size='tiny' widths={3}>
                  <Statistic>
                    <Statistic.Value>$658.64</Statistic.Value>
                    <p style={{ textAlign: 'center' }}>Current Balance</p>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>$360.26</Statistic.Value>
                    <p style={{ textAlign: 'center' }}>Scheduled Income</p>
                  </Statistic>
                  <Statistic>
                    <Statistic.Value>-$150.00</Statistic.Value>
                    <p style={{ textAlign: 'center' }}>Scheduled Expenses</p>
                  </Statistic>
                </Statistic.Group>
              </Grid.Column>
              <Grid.Column width={5} textAlign='left'>
                <Statistic size='small' color='green'>
                  <Statistic.Value>$868.90</Statistic.Value>
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
    transactions: Transactions.collection.find({}).fetch(),
    ready: sub.ready(),
  };
})(TransactionsList);
