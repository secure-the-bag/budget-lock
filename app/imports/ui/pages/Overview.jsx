import React from 'react';
import { Grid, Progress, Container, Header, Icon, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Transactions } from '../../api/transaction/Transaction';
import MonthlySpendingChart from '../components/MonthlySpendingChart';
import CashFlowOverTimeChart from '../components/CashFlowOverTimeChart';
import { getCategoryEquivalent } from '../utilities/GlobalFunctions';

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
    let currentMonth;
    currentMonth = spending.filter(({ date }) => month.getMonth() === date.getMonth() && date <= month);
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
                <div style={{ textAlign: 'right' }}>
                  <Icon name={'settings'} link/>
                </div>
                <Grid.Column style={{ padding: '1.5rem' }}>
                  <Header>Upcoming Bills
                    <hr/>
                  </Header>
                  <p>Credit Card Payment: $150</p>
                  <p>Credit Card Payment: $150</p>
                  <p>Credit Card Payment: $150</p>
                  <p>Credit Card Payment: $150</p>
                  <p>Credit Card Payment: $150</p>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>

            <Grid.Column width={10} style={{ border: '0.2rem solid gray', padding: '1rem', borderRadius: '10px' }}>
              <Grid.Column floated={'right'} style={{ flexGrow: '0', marginBottom: '1.5rem' }}>
                <Icon name={'settings'} link/>
              </Grid.Column>
              <Grid columns={2} style={{ flexGrow: '0', padding: '0rem 1.5rem' }}>
                <Grid.Row>
                  <Grid.Column style={{ paddingRight: '0px' }}>
                    <Header>
                      November Budget
                      <hr/>
                    </Header>
                  </Grid.Column>
                  <Grid.Column textAlign={'right'} style={{ paddingLeft: '0px' }}>
                    <Header>
                      Budget
                      <hr/>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid columns='2' style={{ padding: '0rem 1.5rem 2rem 1.5rem' }}>
                <Grid.Row columns={3}>
                  <Grid.Column width={3}>
                    <b>Groceries
                      <br/>
                      $280
                    </b>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Progress active progress percent={93} color={'red'}>
                      $20 left
                    </Progress>
                  </Grid.Column>
                  <Grid.Column textAlign={'right'} width={3}>
                    <b>$300</b>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={3}>
                    <b>Restaurants
                      <br/>
                      $12
                    </b>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Progress active progress percent={12} color={'green'}>
                      $88 left
                    </Progress>
                  </Grid.Column>
                  <Grid.Column textAlign={'right'} width={3}>
                    <b>$100</b>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column width={3}>
                    <b>Fun
                      <br/>
                      $50
                    </b>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Progress active progress percent={50} color={'yellow'}>
                      $50 left
                    </Progress>
                  </Grid.Column>
                  <Grid.Column textAlign={'right'} width={3}>
                    <b>$50</b>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
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
})(Overview);
