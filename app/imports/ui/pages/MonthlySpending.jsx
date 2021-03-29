import React from 'react';
import { Table, Container, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SpendingRow from '../components/MonthlySpendingRow';
import MonthlySpendingChart from '../components/MonthlySpendingChart';
import { Transactions } from '../../api/transaction/Transaction';
import { getCategoryEquivalent } from '../utilities/GlobalFunctions';

class MonthlySpending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      text: '',
    };
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Fetching Transactions</Loader>;
  }

  renderPage() {

    const spending = this.props.transactions.filter(({ amount }) => amount < 0);
    const month = new Date();
    month.setHours(0, 0, 0, 0);
    let currentMonth = [{}];
    currentMonth = spending.filter(({ date }) => month.getMonth() === date.getMonth() && date <= month);
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
        <MonthlySpendingChart totalSpending={totalSpending.toFixed(2)} data={chartData}
                              month={month.toLocaleString('default', { month: 'long' })}/>
        <div className='monthlySpendingTable'>
          <Table basic='very' selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Payee</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {monthlySpending.map((data, index) => <SpendingRow key={index} data={data}/>)}
            </Table.Body>
          </Table>
        </div>
      </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
MonthlySpending.propTypes = {
  transactions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Transaction documents.
  const sub = Meteor.subscribe(Transactions.userPublicationName);
  return {
    transactions: Transactions.collection.find({}).fetch(),
    ready: sub.ready(),
  };
})(MonthlySpending);
