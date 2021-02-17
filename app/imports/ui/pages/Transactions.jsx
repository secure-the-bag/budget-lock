import React from 'react';
import { Button, Checkbox, Container, Grid, Icon, Image, Search, Table } from 'semantic-ui-react';

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

                {/*
                - Make this collapsible
                - Scheduled Transactions */}
                <Table.Body>
                  <Table.Row>
                    <Table.Cell colspan={7}><b>Scheduled Transactions</b></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Checkbox/>
                    </Table.Cell>
                    <Table.Cell><i>02/25/2021</i></Table.Cell>
                    <Table.Cell><i>Discover</i></Table.Cell>
                    <Table.Cell><i>Credit Card Payment</i></Table.Cell>
                    <Table.Cell> </Table.Cell>
                    <Table.Cell><i>-$150.00</i></Table.Cell>
                    <Table.Cell><i>$868.89</i></Table.Cell>
                    <Table.Cell>
                      <Icon link name='edit outline'/>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Checkbox/>
                    </Table.Cell>
                    <Table.Cell><i>02/20/2021</i></Table.Cell>
                    <Table.Cell><i>University of Hawaii</i></Table.Cell>
                    <Table.Cell><i>Paycheck</i></Table.Cell>
                    <Table.Cell> </Table.Cell>
                    <Table.Cell><i>$360.26</i></Table.Cell>
                    <Table.Cell><i>$1,018.89</i></Table.Cell>
                    <Table.Cell>
                      <Icon link name='edit outline'/>
                    </Table.Cell>
                  </Table.Row>

                  {/* Cleared Transactions */}
                  <Table.Row>
                    <Table.Cell colspan={7}><b>Cleared Transactions</b></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Checkbox/>
                    </Table.Cell>
                    <Table.Cell>02/12/2021</Table.Cell>
                    <Table.Cell>Spotify</Table.Cell>
                    <Table.Cell>Subscription</Table.Cell>
                    <Table.Cell> </Table.Cell>
                    <Table.Cell>-$5.22</Table.Cell>
                    <Table.Cell>$658.63</Table.Cell>
                    <Table.Cell>
                      <Icon link name='edit outline'/>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Checkbox/>
                    </Table.Cell>
                    <Table.Cell>02/11/2021</Table.Cell>
                    <Table.Cell>Walmart</Table.Cell>
                    <Table.Cell>Groceries</Table.Cell>
                    <Table.Cell> </Table.Cell>
                    <Table.Cell>-$21.36</Table.Cell>
                    <Table.Cell>$663.85</Table.Cell>
                    <Table.Cell>
                      <Icon link name='edit outline'/>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Checkbox/>
                    </Table.Cell>
                    <Table.Cell>02/09/2021</Table.Cell>
                    <Table.Cell>Ireh Restaurant</Table.Cell>
                    <Table.Cell>Restaurant</Table.Cell>
                    <Table.Cell> </Table.Cell>
                    <Table.Cell>-$17.32</Table.Cell>
                    <Table.Cell>$675.21</Table.Cell>
                    <Table.Cell>
                      <Icon link name='edit outline'/>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Checkbox/>
                    </Table.Cell>
                    <Table.Cell>02/05/2021</Table.Cell>
                    <Table.Cell>University of Hawaii</Table.Cell>
                    <Table.Cell>Paycheck</Table.Cell>
                    <Table.Cell> </Table.Cell>
                    <Table.Cell>$402.43</Table.Cell>
                    <Table.Cell>$682.53</Table.Cell>
                    <Table.Cell>
                      <Icon link name='edit outline'/>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Checkbox/>
                    </Table.Cell>
                    <Table.Cell>02/01/2021</Table.Cell>
                    <Table.Cell>Starting Balance</Table.Cell>
                    <Table.Cell />
                    <Table.Cell>$280.10</Table.Cell>
                    <Table.Cell>$280.10</Table.Cell>
                    <Table.Cell />
                    <Table.Cell>
                      <Icon link name='edit outline'/>
                    </Table.Cell>
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
