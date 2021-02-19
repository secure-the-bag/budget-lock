import React from 'react';
import { Button, Container, Grid, Table } from 'semantic-ui-react';
import TransactionItem from '../components/TransactionItem';

/**
 * User can add transactions by month, budget, due date, and type
 */
class Transactions extends React.Component {
  render() {

    return (
        <Container style={{ margin: '2rem 1rem' }}>
          <Grid id='transaction' container stretched
                style={{ border: '0.2rem solid gray', padding: '2rem', borderRadius: '10px' }}>
            <Grid.Row>
              {/* Turn into modal */}
              <Button>Add Transaction</Button>
              <Button disabled>Delete Selected</Button>
            </Grid.Row>

            <Grid.Row columns={1}>
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
                    <Table.HeaderCell collapsing/>
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
