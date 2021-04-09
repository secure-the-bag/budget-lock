import React from 'react';
import { Grid, Modal, Progress } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
  AutoForm,
  ErrorsField,
  NumField,
  SelectField,
  SubmitField,
  HiddenField,
} from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Budget } from '../../api/budget/Budget';

class BudgetBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  // Handles the state of the modal (close or open)
  handleModalOpen = () => this.setState({ modalOpen: true });

  handleModalClose = () => this.setState({ modalOpen: false });

  render() {

    const month = new Date();
    month.setHours(0, 0, 0, 0);

    function getSpending(category, transactions) {
      return transactions.filter(({ amount }) => amount < 0)
        .filter(({ date }) => month.getMonth() === date.getMonth() && date <= month)
        .filter(transaction => transaction.category.toLowerCase() === category.toLowerCase())
        .reduce((accumulator, transaction) => accumulator + Math.abs(transaction.amount), 0);
    }

    function getSpendingLeft(budget, category, transaction) {
      const spending = budget - getSpending(category, transaction);
      if (spending <= 0) {
        return 0;
      }
      return spending;
    }

    function getPercentage(cost, transactions, total) {
      const spent = getSpending(cost, transactions);
      const result = spent / total;
      if (spent === total) {
        return 100;
      }
      if (result === 0) {
        return 0;
      }
      return (result * 100).toFixed(0);
    }

    function getProgressColor(spent, transactions, total) {
      const percentage = getPercentage(spent, transactions, total);
      if ((percentage >= 0 && percentage < 50)) {
        return 'green';
      }
      if (percentage >= 51 && percentage < 90) {
        return 'yellow';
      }
      return 'red';
    }

    const bridge = new SimpleSchema2Bridge(Budget.schema);

    return (
      <Modal size='mini'
             closeIcon
             open={this.state.modalOpen}
             onClose={this.handleModalClose}
             onOpen={this.handleModalOpen}
             trigger={
               <Grid.Row columns={3} className={'budget-bar'}>
                 <Grid.Column width={3}>
                   <b style={{ textTransform: 'capitalize' }}>
                     {this.props.budget.category}
                     <br/>
                     <b>{`$${this.props.budget.budget}`}</b>
                   </b>
                 </Grid.Column>
                 <Grid.Column width={10}>
                   <Progress active progress
                             percent={getPercentage(this.props.budget.category, this.props.transactions, this.props.budget.budget)}
                             color={getProgressColor(this.props.budget.category, this.props.transactions, this.props.budget.budget)}>
                     {`$${getSpendingLeft(this.props.budget.budget, this.props.budget.category, this.props.transactions)} left`}
                   </Progress>
                 </Grid.Column>
                 <Grid.Column textAlign={'right'} width={3}>
                   <b>{`$${getSpending(this.props.budget.category, this.props.transactions)}`}</b>
                 </Grid.Column>
               </Grid.Row>
             }
      >
        <Modal.Header>Edit Budget</Modal.Header>
        <Modal.Content>
          <AutoForm
            schema={bridge}
            modal={this.props.budget}
            onSubmit={data => { this.submit(data) }}>
            <SelectField name='category'/>
            <NumField name='budget'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </AutoForm>
        </Modal.Content>
      </Modal>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
BudgetBar.propTypes = {
  budget: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
};

export default BudgetBar;
