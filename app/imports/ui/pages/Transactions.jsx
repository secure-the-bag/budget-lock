import React from 'react';
import { Button, Container, Divider, Grid, Input, Statistic, Table } from 'semantic-ui-react';
import TransactionItem from '../components/TransactionItem';

/**
 * User can add transactions by month, budget, due date, and type
 */
class Transactions extends React.Component {
  render() {
    return (
        <Container style={{ margin: '2rem 1rem' }}>
          <Grid id='transaction' container
                style={{ border: '0.2rem solid gray', padding: '2rem', borderRadius: '10px' }}>
            <Grid.Row verticalAlign='middle' columns={2}>
              <Grid.Column floated='left' width={11} textAlign='right'>
                <Statistic.Group size='tiny' widths={3}>
                  <Statistic>
                    <Statistic.Value>$658.63</Statistic.Value>
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
              <Grid.Column floated='right' width={4}>
                <Statistic size='small' color='green'>
                  <Statistic.Value>$868.89</Statistic.Value>
                  <Statistic.Label>Total Balance</Statistic.Label>
                </Statistic>
              </Grid.Column>
            </Grid.Row>

            <Divider/>

            <Grid.Row columns={2} verticalAlign='bottom'>
              <Grid.Column floated='left'>
                <Button compact>Add Transaction</Button>
                <Button compact disabled>Delete Selected (0)</Button>
              </Grid.Column>
              <Grid.Column textAlign='right' floated='right'>
                <Input size='mini' icon='search' placeholder='Search...' />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Table singleLine compact='very'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell collapsing/>
                    <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Payee</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Category</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Notes</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Amount</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Balance</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <TransactionItem/>
              </Table>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

export default Transactions;
