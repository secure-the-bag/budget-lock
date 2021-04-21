import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Header, Table } from 'semantic-ui-react';
import { getCategoryEquivalent } from '../../utilities/GlobalFunctions';
import UpcomingBillsTableItem from './UpcomingBillsTableItem';

const UpcomingBillsContent = (props) => {
  const until = props.bill.until ? props.bill.until.toLocaleDateString() : 'Not Specified';
  return (
      <Grid columns={5} centered
            style={{ paddingLeft: '2rem' }}>
        <Grid.Row>
          <Grid.Column as={Header}
                       size='medium'
                       content={`$${props.bill.fixedAmount.toFixed(2)}`}
                       subheader={'Default Amount'}
                       textAlign='center'
          />
          <Grid.Column as={Header}
                       size='medium'
                       content={getCategoryEquivalent(props.bill.category, 'label')}
                       subheader={'Category'}
                       textAlign='center'
          />
          <Grid.Column as={Header}
                       size='medium'
                       content={props.bill.frequency.charAt(0).toLocaleUpperCase() + props.bill.frequency.slice(1)}
                       subheader={'Frequency'}
                       textAlign='center'
          />
          <Grid.Column as={Header}
                       size='medium'
                       content={until}
                       subheader={'Last Day'}
                       textAlign='center'
          />
          <Grid.Column floated='right' width={2}>
            <Button basic compact>Edit</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Table singleLine basic='very' compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2}>Date</Table.HeaderCell>
                <Table.HeaderCell width={2}>Amount</Table.HeaderCell>
                <Table.HeaderCell width={2}>Balance</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {props.transactions.map((value, index) => <UpcomingBillsTableItem key={index} transaction={value}/>)}
            </Table.Body>
          </Table>
        </Grid.Row>
      </Grid>
  );
};

UpcomingBillsContent.propTypes = {
  bill: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
};

export default (UpcomingBillsContent);
