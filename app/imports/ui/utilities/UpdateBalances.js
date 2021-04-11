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
 * @param laterTransactions, previously keyed in transactions with date field values greater than the new transaction's
 */
export const updateBalances = (balance, laterTransactions) => {
  let updatedBalance = balance;
  laterTransactions.map((transaction) => {
    updatedBalance += transaction.amount;
    return Transactions.collection.update(transaction._id, { $set: { balance: updatedBalance } });
  });
};

/**
 * Gets an array of transaction objects with date field values greater than the new transaction's date field.
 *
 * @param newDate, date of new transaction
 * @param transactions, Transaction.collection
 */
export const getLaterTransactions = (newDate, transactions) => transactions.filter(({ date }) => date > newDate).reverse();

/**
 * Computes for the new balance after user inputs a new transaction
 *
 * @param newDate, date of new transaction
 * @param newAmount, amount of new transaction
 * @param transactions, Transaction.collection
 * @returns Number
 */
export const getNewBalance = (newDate, newAmount, transactions) => {
  let balance;

  const laterTransactions = getLaterTransactions(newDate, transactions);

  if (laterTransactions.length === 0) {
    balance = transactions[0].balance + newAmount;
  } else {
    const next = laterTransactions[0];
    const beforeBalance = Number((next.balance - next.amount).toFixed(2));
    balance = beforeBalance + newAmount;

    updateBalances(balance, laterTransactions);
  }
  return balance;
};
