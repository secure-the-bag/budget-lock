import React from 'react';
import { Container, Divider, Grid, Input, Statistic, Table } from 'semantic-ui-react';
import TransactionItem from '../components/TransactionItem';
import AddTransaction from '../components/AddTransaction';

/**
 * User can add transactions by month, budget, due date, and type
 */
class TransactionsList extends React.Component {
  render() {
    const allTransactions = [{
      name: '',
      date: new Date(2021, 2, 31),
      payee: 'Discover',
      category: 'creditCard',
      notes: '',
      amount: -150,
      balance: 868.90,
    }, {
      name: '',
      date: new Date(2021, 2, 30),
      payee: 'University of Hawaii',
      category: 'paycheck',
      notes: '',
      amount: 360.26,
      balance: 1018.90,
    }, {
      name: '',
      date: new Date(2021, 2, 29),
      payee: 'Spotify',
      category: 'subscription',
      notes: '',
      amount: -5.22,
      balance: 658.64,
    }, {
      name: '',
      date: new Date(2021, 2, 24),
      payee: 'Walmart',
      category: 'groceries',
      notes: '',
      amount: -21.36,
      balance: 663.86,
    }, {
      name: '',
      date: new Date(2021, 2, 24),
      payee: 'Ireh Restaurant',
      category: 'restaurant',
      notes: '',
      amount: -17.32,
      balance: 675.22,
    }, {
      name: '',
      date: new Date(2021, 2, 24),
      payee: 'University of Hawaii',
      category: 'paycheck',
      notes: '',
      amount: 402.43,
      balance: 682.54,
    }, {
      name: '',
      date: new Date(2021, 2, 20),
      payee: '',
      notes: '',
      category: 'starting',
      amount: 280.11,
      balance: 280.11,
    }];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const scheduledTransactions = allTransactions.filter(({ date }) => date > today);

    const clearedTransactions = allTransactions.filter(({ date }) => date <= today);

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

export default TransactionsList;
