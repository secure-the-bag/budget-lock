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
              <Table singleLine attached={'top'}>
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
              </Table>

              {/*
                Make this collapsible so they're all in one table
                Scheduled Transactions */}
              <Table attached compact>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={2}><i>02/25/2021</i></Table.Cell>
                    <Table.Cell width={3}><i>Discover</i></Table.Cell>
                    <Table.Cell width={4}><i>Credit Card Payment</i></Table.Cell>
                    <Table.Cell width={3}> </Table.Cell>
                    <Table.Cell width={2}><i>-$150.00</i></Table.Cell>
                    <Table.Cell width={2}><i>$868.89</i></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell><i>02/20/2021</i></Table.Cell>
                    <Table.Cell><i>University of Hawaii</i></Table.Cell>
                    <Table.Cell><i>Paycheck</i></Table.Cell>
                    <Table.Cell> </Table.Cell>
                    <Table.Cell><i>$360.26</i></Table.Cell>
                    <Table.Cell><i>$1,018.89</i></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

              {/* Approved Transactions */}
              <Table attached compact>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={2}>02/12/2021</Table.Cell>
                    <Table.Cell width={3}>Spotify</Table.Cell>
                    <Table.Cell width={4}>Subscription</Table.Cell>
                    <Table.Cell width={3}> </Table.Cell>
                    <Table.Cell width={2}>-$5.22</Table.Cell>
                    <Table.Cell width={2}>$658.63</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>02/11/2021</Table.Cell>
                    <Table.Cell>Walmart</Table.Cell>
                    <Table.Cell>Groceries</Table.Cell>
                    <Table.Cell> </Table.Cell>
                    <Table.Cell>-$21.36</Table.Cell>
                    <Table.Cell>$663.85</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>02/09/2021</Table.Cell>
                    <Table.Cell>Ireh Restaurant</Table.Cell>
                    <Table.Cell>Restaurant</Table.Cell>
                    <Table.Cell> </Table.Cell>
                    <Table.Cell>-$17.32</Table.Cell>
                    <Table.Cell>$675.21</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>02/05/2021</Table.Cell>
                    <Table.Cell>University of Hawaii</Table.Cell>
                    <Table.Cell>Paycheck</Table.Cell>
                    <Table.Cell> </Table.Cell>
                    <Table.Cell>$402.43</Table.Cell>
                    <Table.Cell>$682.53</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>02/01/2021</Table.Cell>
                    <Table.Cell> </Table.Cell>
                    <Table.Cell>Starting Balance</Table.Cell>
                    <Table.Cell> </Table.Cell>
                    <Table.Cell>$280.10</Table.Cell>
                    <Table.Cell>$280.10</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

export default Transactions;
