import React from 'react';
import { Grid, Progress } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class BudgetBar extends React.Component {

  render() {

    function getSpending(category, transactions) {
      return transactions.filter(transaction => transaction.category.toLowerCase() === category.toLowerCase()).reduce((accumulator, transaction) => accumulator + Math.abs(transaction.amount), 0);
    }

    function getPercentage(cost, transactions, total) {
      const spent = getSpending(cost, transactions);
      const result = total / spent;
      if (!Number.isFinite(result)) {
        return 0;
      }
      return result.toFixed(0);
    }

    function getProgressColor(spent, transactions, total) {
      const percentage = getPercentage(spent, transactions, total);
      if ((percentage >= 0 && percentage < 50) || !Number.isFinite(percentage)) {
        return 'green';
      }
      if (percentage >= 51 && percentage < 90) {
        return 'yellow';
      }
      return 'red';
    }

    return (
      <Grid.Row columns={3}>
        <Grid.Column width={3}>
          <b style={{ textTransform: 'capitalize' }}>
            ${this.props.budget.category}
            <br/>
            <b>{`$${this.props.budget.budget}`}</b>
          </b>
        </Grid.Column>
        <Grid.Column width={10}>
          <Progress active progress
                    percent={getPercentage(this.props.budget.category, this.props.transactions, this.props.budget.budget)}
                    color={getProgressColor(this.props.budget.category, this.props.transactions, this.props.budget.budget)}>
            {`$${this.props.budget.budget - getSpending(this.props.budget.category, this.props.transactions)} left`}
          </Progress>
        </Grid.Column>
        <Grid.Column textAlign={'right'} width={3}>
          <b>{`$${getSpending(this.props.budget.category, this.props.transactions)}`}</b>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
BudgetBar.propTypes = {
  budget: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
};

export default BudgetBar;
