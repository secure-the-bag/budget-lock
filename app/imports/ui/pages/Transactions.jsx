import React from 'react';
import { Container, Grid, Table } from 'semantic-ui-react';

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
              <Table singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Payee</Table.HeaderCell>
                    <Table.HeaderCell>Category</Table.HeaderCell>
                    <Table.HeaderCell>Notes</Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
              </Table>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

export default Transactions;
