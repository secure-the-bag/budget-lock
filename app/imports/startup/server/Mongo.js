import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Transactions } from '../../api/transaction/Transaction';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Transactions.collection.find()
    .count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default transactions.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find()
    .count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
