import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class BillCollection {
  constructor() {
    this.name = 'BillCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      fixedAmount: Number,
      payee: String,
      category: String,
      frequency: {
        type: String,
        allowedValues: ['daily', 'weekly', 'monthly', 'quarterly', 'biannually', 'annually'],
      },
      start: Date,
      until: {
        type: Date,
        optional: true,
      },
      owner: String,
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Bills = new BillCollection();
