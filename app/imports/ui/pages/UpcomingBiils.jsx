import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accordion, Container, Grid, Loader } from 'semantic-ui-react';
import { Bills } from '../../api/bill/Bill';
import { Transactions } from '../../api/transaction/Transaction';
import UpcomingBillsItem from '../components/UpcomingBillsItem';

const UpcomingBills = (props) => (!props.ready ?
      <Loader active>Fetching Bills</Loader> :
      (
          <Container style={{ margin: '2rem 1rem' }}>
            <Grid id='transaction' container
                  style={{ padding: '2rem', borderRadius: '10px' }}>
              <Accordion fluid styled>
                {props.bills.map(
                    (bill, index) => <UpcomingBillsItem key={index} bill={bill} transactions={props.transactions}/>,
                )}
              </Accordion>
            </Grid>
          </Container>
      ));

UpcomingBills.propTypes = {
  bills: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const ready = Meteor.subscribe(Bills.userPublicationName).ready() &&
      Meteor.subscribe(Transactions.userPublicationName).ready();
  const bills = Bills.collection.find({}, { sort: { date: -1 } }).fetch();
  const transactions = Transactions.collection.find({}, { sort: { date: -1 } }).fetch();
  return {
    transactions,
    bills,
    ready,
  };
})(UpcomingBills);
