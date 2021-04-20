import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accordion, Container, Grid, Loader } from 'semantic-ui-react';
import { Bills } from '../../api/bill/Bill';
import { Transactions } from '../../api/transaction/Transaction';
import UpcomingBillsContent from '../components/upcoming-bills/UpcomingBillsContent';

const UpcomingBills = (props) => {
  const panels = [];
  props.bills.forEach(function (bill) {
    panels.push({
      key: bill.payee.replace(/\s+/g, '-').toLowerCase(),
      title: {
        content: bill.payee,
        style: { padding: '1.5rem', fontSize: '17px' },
      },
      content: {
        content: (
            <div>
              {<UpcomingBillsContent bill={bill} transactions={props.transactions}/>}
            </div>
        ),
      },
    });
  });

  return (!props.ready) ?
      <Loader active>Fetching Bills</Loader> :
      (
          <Container style={{ margin: '2rem 1rem' }}>
            <Grid id='transaction' container
                  style={{ padding: '1.5rem', borderRadius: '10px' }}>
              <Accordion fluid
                         styled
                         panels={panels}/>
            </Grid>
          </Container>
      );
};

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
