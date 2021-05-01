import { getNewBalance } from './UpdateBalances';
import { Transactions } from '../../api/transaction/Transaction';

export const getCategoryChoices = () => [
  {
    label: 'Paycheck',
    value: 'paycheck',
  }, {
    label: 'Credit Card Payment',
    value: 'creditCard',
  }, {
    label: 'Subscription',
    value: 'subscription',
  }, {
    label: 'Restaurant',
    value: 'restaurant',
  }, {
    label: 'Groceries',
    value: 'groceries',
  }, {
    label: 'Shopping',
    value: 'shopping',
  }, {
    label: 'Fun',
    value: 'fun',
  }, {
    label: 'Starting Balance',
    value: 'starting',
  }];

export const getCategoryChoicesNoStarting = getCategoryChoices().filter(({ value }) => value !== 'starting');

export const getCategoryEquivalent = (category, type) => ((type === 'label') ?
    getCategoryChoices().find(({ value }) => value === category).label :
    getCategoryChoices().find(({ label }) => label === category).value);

export const frequencyChoices = [
  {
    label: 'Daily',
    value: 'daily',
  }, {
    label: 'Weekly',
    value: 'weekly',
  }, {
    label: 'Monthly',
    value: 'monthly',
  }, {
    label: 'Quarterly',
    value: 'quarterly',
  }, {
    label: 'Biannually',
    value: 'biannually',
  }, {
    label: 'Annually',
    value: 'annually',
  },
];

export const getFrequencyEquivalent = (frequency, type) => ((type === 'label') ?
    frequencyChoices.find(({ value }) => value === frequency).label :
    frequencyChoices.find(({ label }) => label === frequency).value);

export const validateOptionalFields = (data) => {
  const payee = (typeof data.payee === 'string') ? data.payee : '';
  const name = (typeof data.name === 'string') ? data.name : '';
  const notes = (typeof data.notes === 'string') ? data.notes : '';

  return { payee, name, notes };
};

export const getDateUntil = (start, until, frequency) => {
  const tempUntil = new Date(start.getTime());
  if (!until) {
  if (frequency === 'daily') tempUntil.setDate(tempUntil.getDate() + 11);
  if (frequency === 'weekly') tempUntil.setDate(tempUntil.getDate() + 77);
  if (frequency === 'monthly') tempUntil.setMonth(tempUntil.getMonth() + 11);
  if (frequency === 'quarterly') tempUntil.setMonth(tempUntil.getMonth() + 44);
  if (frequency === 'biannually') tempUntil.setMonth(tempUntil.getMonth() + 66);
  if (frequency === 'annually') tempUntil.setFullYear(tempUntil.getFullYear() + 11);
  } else {
    tempUntil.setTime(new Date(until.getTime()));
  }
return tempUntil;
};

export const insertTransaction = (data, transactions) => {
  const inputData = {};
  inputData.date = data.date;
  inputData.payee = data.payee;
  inputData.amount = -data.amount;
  inputData.balance = transactions.length === 0 ? inputData.amount :
      getNewBalance(inputData.date, inputData.amount, transactions);
  const { name, notes } = validateOptionalFields(inputData);
  inputData.name = name;
  inputData.notes = notes;
  inputData.owner = data.owner;
  inputData.category = data.category;
  Transactions.collection.insert(inputData, { removeEmptyStrings: false });
};

export const insertNewBillTransactions = ({ fixedAmount, start, until, frequency, payee, category, owner }, transactions) => {
  const tempDate = new Date(start.getTime());
  let count = 0;
  while (tempDate < until) {
    tempDate.setTime(start.getTime());
    if (frequency === 'daily') tempDate.setDate(start.getDate() + (count * 1));
    if (frequency === 'weekly') tempDate.setDate(start.getDate() + (count * 7));
    if (frequency === 'monthly') tempDate.setMonth(start.getMonth() + (count * 1));
    if (frequency === 'quarterly') tempDate.setMonth(start.getMonth() + (count * 4));
    if (frequency === 'biannually') tempDate.setMonth(start.getMonth() + (count * 6));
    if (frequency === 'annually') tempDate.setFullYear(start.getFullYear() + (count * 1));
    // insert transaction
    const data = {};
    data.date = tempDate;
    data.category = category;
    data.payee = payee;
    data.amount = fixedAmount;
    data.owner = owner;
    insertTransaction(data, transactions);
    count += 1;
  }
};
