import React from 'react';
import { Table, Container, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';
import SpendingRow from '../components/MonthlySpendingRow';
import { Transactions } from '../../api/transaction/Transaction';

class MonthlySpending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      text: '',
    };
  }

  componentDidMount() {
    this.monthSpending();
  }

  monthSpending() {
    Highcharts.chart('monthSpending', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: 'November Spending: $432.12',
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      credits: {
        enabled: false,
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [{
        name: 'Categories',
        colorByPoint: true,
        point: {
          events: {
            // have to fix later
            click: function (e) {
              const category = e.point.options.name;
              this.setState({ categoryName: category });
            },
          },
        },
        data: [{
          name: 'Groceries',
          y: 61.41,
        }, {
          name: 'Restaurants',
          y: 11.84,
        }, {
          name: 'Fun',
          y: 30.85,
        }],
      }],
    });
  }

  // /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  // render() {
  //   return (this.props.ready) ? this.renderPage() : <Loader active>
  //     Fetching Transactions</Loader>;
  // }

  render() {

    const spending = this.props.transactions.filter(({ amount }) => amount < 0);
    const month = new Date();
    month.setHours(0, 0, 0, 0);
    const currentMonth = spending.filter(({ date }) => month.getMonth() === date.getMonth() && date <= month);
    const monthlySpending = [];
    for (let i = 0; i < currentMonth.length; i++) {
      const data = {
        payee: currentMonth[i].payee,
        amount: currentMonth[i].amount,
        date: currentMonth[i].date.toLocaleDateString(),
        category: currentMonth[i].category,
        notes: currentMonth[i].notes,
        _id: currentMonth[i]._id,
      };
      monthlySpending.push(data);
    }

    return (
      <Container style={{ margin: '2rem 1rem' }}>
        <div id='monthSpending'/>
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
