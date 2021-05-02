import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Accordion, Container, Divider, Grid, Header, Loader } from 'semantic-ui-react';
import { Bills } from '../../api/bill/Bill';
import { Transactions } from '../../api/transaction/Transaction';
import UpcomingBillsContent from '../components/upcoming-bills/UpcomingBillsContent';
import AddUpcomingBill from '../components/upcoming-bills/AddUpcomingBill';
import { getLaterTransactions, updateBalances } from '../utilities/UpdateBalances';

const today = new Date();
today.setHours(23, 59, 59, 999);

const UpcomingBills = (props) => {

  const getTransactions = (billPayee) => props.transactions.filter(({ payee }) => payee === billPayee);

  const fixBalances = () => {
    if (props.transactions.length > 0) {
      const firstTransaction = props.transactions[0];
      // update balances after
      updateBalances(firstTransaction.balance, getLaterTransactions(firstTransaction.date, props.allTransactions));
    }
  };

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
              {<UpcomingBillsContent bill={bill} transactions={getTransactions(bill.payee)} allTransactions={props.allTransactions}/>}
            </div>
        ),
      },
    });
  });

  return (!props.ready) ?
      <Loader active>Fetching Bills</Loader> :
      (
          <Container style={{ margin: '2rem 1rem' }}>
            {fixBalances()}
            <Grid id='transaction'
                  container
                  style={{ border: '0.2rem solid gray', padding: '1.5rem', borderRadius: '10px' }}>
              <Grid.Row textAlign='center'>
                <Grid.Column as={Header}
                             size='huge'
                             content={'Upcoming Bills'}
                />
              </Grid.Row>
              <Divider/>
              <Accordion fluid
                         styled
                         panels={panels}
              />
              <Grid.Row>
                <AddUpcomingBill transactions={props.allTransactions}/>
              </Grid.Row>
            </Grid>
          </Container>
      );
};

UpcomingBills.propTypes = {
  bills: PropTypes.array.isRequired,
  allTransactions: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const ready = Meteor.subscribe(Bills.userPublicationName).ready() &&
      Meteor.subscribe(Transactions.userPublicationName).ready();
  const bills = Bills.collection.find({}, { sort: { date: -1 } }).fetch();
  const transactions = Transactions.collection.find({}, { sort: [['date', 'asc']] }).fetch().filter(({ date }) => date > today);
  const allTransactions = Transactions.collection.find({}, { sort: { date: -1 } }).fetch().filter(({ date }) => date > today);
  return {
    allTransactions,
    transactions,
    bills,
    ready,
  };
})(UpcomingBills);
