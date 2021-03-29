import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class TransactionsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'TransactionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      date: Date,
      payee: { type: String, defaultValue: '' },
      amount: Number,
      balance: Number,
      notes: { type: String, optional: true, defaultValue: '' },
      owner: String,
      category: {
        type: String,
        allowedValues: ['paycheck', 'creditCard', 'subscription', 'restaurant', 'groceries', 'shopping', 'fun', 'starting'],
        defaultValue: '',
      },
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Transactions = new TransactionsCollection();
