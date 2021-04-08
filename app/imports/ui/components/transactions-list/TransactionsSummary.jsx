import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Statistic } from 'semantic-ui-react';

const TransactionsSummary = (props) => {
  // convert to computed numbers to string
  const toStringColor = (value) => ((value < 0) ?
      { string: `-$${(Math.abs(value)).toFixed(2)}`, color: 'red' } :
      { string: `$${value.toFixed(2)}`, color: 'green' });

  return (
      <Grid.Row verticalAlign='middle' columns={2} stretched centered>
        <Grid.Column width={8} textAlign='right'>
          <Statistic.Group size='tiny' widths={3}>
            <Statistic>
              <Statistic.Value>{toStringColor(props.data.current).string}</Statistic.Value>
              <p style={{ textAlign: 'center' }}>Current Balance</p>
            </Statistic>
            <Statistic>
              <Statistic.Value>${props.data.scheduledIncome.toFixed(2)}</Statistic.Value>
              <p style={{ textAlign: 'center' }}>Scheduled Income</p>
            </Statistic>
            <Statistic>
              <Statistic.Value>{toStringColor(props.data.scheduledExpenses).string}</Statistic.Value>
              <p style={{ textAlign: 'center' }}>Scheduled Expenses</p>
            </Statistic>
          </Statistic.Group>
        </Grid.Column>
        <Grid.Column width={5} textAlign='left'>
          <Statistic size='small' color={toStringColor(props.data.total).color}>
            <Statistic.Value>{toStringColor(props.data.total).string}</Statistic.Value>
            <Statistic.Label>Total Balance</Statistic.Label>
          </Statistic>
        </Grid.Column>
      </Grid.Row>
  );
};

TransactionsSummary.propTypes = {
  data: PropTypes.object.isRequired,
};

export default (TransactionsSummary);
