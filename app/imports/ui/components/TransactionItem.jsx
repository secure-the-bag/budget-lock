import React from 'react';
import { Checkbox, Icon, Table } from 'semantic-ui-react';

class TransactionItem extends React.Component {
  render() {
    return (
        <Table.Body>
          {/*
                - Make this collapsible
                - Scheduled Transactions */}
          <Table.Row>
            <Table.Cell colSpan={7}><b>Scheduled Transactions</b></Table.Cell>
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
          </Table.Row>

          {/* Cleared Transactions */}
          <Table.Row>
            <Table.Cell colSpan={7}><b>Cleared Transactions</b></Table.Cell>
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
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Checkbox/>
            </Table.Cell>
            <Table.Cell>02/01/2021</Table.Cell>
            <Table.Cell>Starting Balance</Table.Cell>
            <Table.Cell />
            <Table.Cell />
            <Table.Cell>$280.10</Table.Cell>
            <Table.Cell>$280.10</Table.Cell>
          </Table.Row>
        </Table.Body>
    );
  }
}

export default (TransactionItem);
