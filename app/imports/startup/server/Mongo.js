import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Transactions } from '../../api/transaction/Transaction';
import { Profiles } from '../../api/profile/Profile';

/* eslint-disable no-console */

const defaultProfiles = JSON.parse(Assets.getText('defaultProfile.json'));

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
