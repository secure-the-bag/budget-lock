/**
 * UpdateBalances.js is a global document that contains the utility functions that:
 *  (1) computes for the balance field of a newly added transaction, and
 *  (2) updates the balance fields of previously keyed in transactions that
 *      has date field values greater than the new transaction's date field.
 */
import { Transactions } from '../../api/transaction/Transaction';

/**
 * Updates the balances of filtered transactions in Transaction collection
 *
 * @param balance, balance after adding the amount of newly added transaction
 * @param nextTransactions, previously keyed in transactions with date field values greater than the new transaction's
 */
const updateBalances = (balance, nextTransactions) => {
  let updatedBalance = balance;
  nextTransactions.map((transaction) => {
    updatedBalance += transaction.amount;
    return Transactions.collection.update(transaction._id, { $set: { balance: updatedBalance } });
  });
};

/**
 * Computes for the new balance after user inputs a new transaction
 *
 * @param newDate
 * @param newAmount
 * @param transactions
 * @returns Number
 */
export const getNewBalance = (newDate, newAmount, transactions) => {
  let balance;

  if (transactions.length === 0) {
    return newAmount;
  }

  const nextTransactions = transactions.filter(({ date }) => date >= newDate).reverse();

  if (nextTransactions.length === 0) {
    balance = transactions[0].balance + newAmount;
  } else {
    const next = nextTransactions[0];
    const beforeBalance = Number((next.balance - next.amount).toFixed(2));
    balance = beforeBalance + newAmount;

    updateBalances(balance, nextTransactions);
  }
  return balance;
};
