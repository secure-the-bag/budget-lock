import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Transactions } from '../../api/transaction/Transaction';
import { Profiles } from '../../api/profile/Profile';
import { Budget } from '../../api/budget/Budget';
import { Bills } from '../../api/bill/Bill';

/* eslint-disable no-console */

const defaultProfiles = JSON.parse(Assets.getText('defaultProfile.json'));
const defaultTransaction = JSON.parse(Assets.getText('defaultTransactions.json'));
const defaultBudget = JSON.parse(Assets.getText('defaultBudget.json'));
const defaultBill = JSON.parse(Assets.getText('defaultBills.json'));

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

/** Initialize the database with a default data document. */
function addProfiles(data) {
  console.log(`  Adding: Profile ${data.firstName} for (${data.owner})`);
  Profiles.collection.insert(data);
}

if (Profiles.collection.find().count() === 0) {
  console.log('Creating default profile data.');
  defaultProfiles.map(data => addProfiles(data));
}

function addTransaction(data) {
  console.log(`  Adding: Transaction ${data.payee} | ${data.category} | (${data.owner})`);
  Transactions.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Transactions.collection.find().count() === 0) {
  console.log('Creating default transaction data.');
  defaultTransaction.map(data => addTransaction(data));
}

function addBill(data) {
  console.log(`  Adding: Bill ${data.category}: $${data.fixedAmount} | (${data.owner})`);
  Bills.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Bills.collection.find().count() === 0) {
  console.log('Creating default bill data.');
  defaultBill.map(data => addBill(data));
}

function addBudget(data) {
  console.log(`  Adding: Budget ${data.category}: $${data.budget} | (${data.owner})`);
  Budget.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Budget.collection.find().count() === 0) {
  console.log('Creating default budget data.');
  defaultBudget.map(data => addBudget(data));
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find()
    .count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
