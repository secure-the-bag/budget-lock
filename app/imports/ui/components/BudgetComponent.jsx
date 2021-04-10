import React from 'react';
import { Grid, Header, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Transactions } from '../../api/transaction/Transaction';
import { Budget } from '../../api/budget/Budget';
import BudgetBar from './BudgetBar';
import AddBudget from './AddBudget';

class BudgetComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Fetching Data</Loader>;
  }

  renderPage() {
    return (
      <Grid.Column width={10} style={{ border: '0.2rem solid gray', padding: '1rem', borderRadius: '10px' }}>
        <Grid.Column align={'right'} style={{ flexGrow: '0', marginBottom: '1.5rem' }}>
          <AddBudget budget={this.props.budget}/>
        </Grid.Column>
        <Grid columns={2} style={{ flexGrow: '0', padding: '0rem 1.5rem' }}>
          <Grid.Row>
            <Grid.Column style={{ paddingRight: '0px' }}>
              <Header textAlign={'left'}>
                {this.props.month} Budget
                <hr/>
              </Header>
            </Grid.Column>
            <Grid.Column textAlign={'right'} style={{ paddingLeft: '0px' }}>
              <Header>
                Spent
                <hr/>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid style={{ padding: '0rem 1.5rem 2rem 1.5rem' }}>
          {this.props.budget.map((data, index) => <BudgetBar key={index} budget={data} transactions={this.props.transactions}/>)}
        </Grid>
      </Grid.Column>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
BudgetComponent.propTypes = {
  budget: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  month: PropTypes.string.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Transaction documents.
  const sub = Meteor.subscribe(Budget.userPublicationName);
  const sub2 = Meteor.subscribe(Transactions.userPublicationName);
  return {
    budget: Budget.collection.find({}).fetch(),
    transactions: Transactions.collection.find({}).fetch(),
    ready: sub.ready() && sub2.ready(),
  };
})(BudgetComponent);
