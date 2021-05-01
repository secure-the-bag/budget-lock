import React from 'react';
import { Grid, Container, Header, Loader, Table } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Transactions } from '../../api/transaction/Transaction';
import MonthlySpendingChart from '../components/MonthlySpendingChart';
import CashFlowOverTimeChart from '../components/CashFlowOverTimeChart';
import BudgetComponent from '../components/BudgetComponent';
import { getCategoryEquivalent } from '../utilities/GlobalFunctions';
import { Bills } from '../../api/bill/Bill';
import UpcomingBillsOverview from '../components/UpcomingBillsOverview';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Fetching Data</Loader>;
  }

  renderPage() {
    const spending = this.props.transactions.filter(({ amount }) => amount < 0);
    const month = new Date();
    month.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    let currentMonth;
    currentMonth = spending.filter(({ date }) => month.getMonth() === date.getMonth() && date <= month);

    const bills = this.props.bills.map(bill => bill.payee);
    const upcomingBills = spending.filter(({ date, payee }) => date > today && bills.includes(payee));

    // eslint-disable-next-line no-undef
    currentMonth = _.sortBy(currentMonth, 'date');
    const monthlySpending = [];
    let totalSpending = 0;
    for (let i = 0; i < currentMonth.length; i++) {
      const data = {
        payee: currentMonth[i].payee,
        amount: currentMonth[i].amount,
        date: currentMonth[i].date.toLocaleDateString(),
        category: currentMonth[i].category,
        notes: currentMonth[i].notes,
        _id: currentMonth[i]._id,
      };
      totalSpending += Math.abs(currentMonth[i].amount);
      monthlySpending.push(data);
    }
    // eslint-disable-next-line no-undef
    const groupedCategory = _.groupBy(currentMonth, 'category');
    const categoryName = Object.keys(groupedCategory);
    const chartData = [];
    for (let i = 0; i < categoryName.length; i++) {
      let amount = 0;
      let category = '';
      for (let j = 0; j < groupedCategory[categoryName[i]].length; j++) {
        amount += Math.abs(groupedCategory[categoryName[i]][j].amount);
        category = getCategoryEquivalent(groupedCategory[categoryName[i]][j].category, 'label');
      }
      chartData.push({
        name: category,
        y: amount / totalSpending,
        x: amount,
      });
    }
    return (
      <Container style={{ margin: '2rem 1rem' }}>
        <Grid id='overview' container stretched centered>
          <Grid.Row>
            <Grid.Column width={5} style={{ border: '0.2rem solid gray', padding: '1rem', marginRight: '5rem', borderRadius: '10px' }}>
              <Grid.Row>
                <Grid.Column style={{ padding: '1.5rem' }}>
                  <Grid.Row as={Header} content='Upcoming Bills'/>
                  <hr/>
                  <Grid.Row style={{ overflow: 'auto', maxHeight: 255 }}>
                    <Table singleLine basic='very' compact>
                      <Table.Body>
                        {upcomingBills.map((transaction, index) => <UpcomingBillsOverview key={index} transaction={transaction}/>)}
                      </Table.Body>
                    </Table>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
            <Grid.Row style={{ maxWidth: '50rem' }}>
              <BudgetComponent month={month.toLocaleString('default', { month: 'long' })}/>
            </Grid.Row>
          </Grid.Row>
        </Grid>

        <Grid container stretched
              style={{ border: '0.2rem solid gray', padding: '2rem', borderRadius: '10px' }}>
          <Grid.Row>
            <Header style={{ margin: '1rem', width: '-webkit-fill-available' }}>
              Trends
              <hr/>
            </Header>
          </Grid.Row>
          <Grid.Row columns={'equal'}>
            <Grid.Column>
              <CashFlowOverTimeChart/>
            </Grid.Column>
            <Grid.Column>
              <MonthlySpendingChart totalSpending={totalSpending.toFixed(2)} data={chartData}
                                    month={month.toLocaleString('default', { month: 'long' })}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Overview.propTypes = {
  transactions: PropTypes.array.isRequired,
  bills: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Transaction documents.
  const sub = Meteor.subscribe(Transactions.userPublicationName);
  const sub2 = Meteor.subscribe(Bills.userPublicationName);
  return {
    transactions: Transactions.collection.find({}, { sort: [['date', 'asc']] }).fetch(),
    bills: Bills.collection.find({}).fetch(),
    ready: sub.ready() && sub2.ready(),
  };
})(Overview);
