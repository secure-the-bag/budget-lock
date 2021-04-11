import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class BillCollection {
  constructor() {
    this.name = 'BillCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      fixedAmount: Number,
      category: String,
      frequency: {
        type: String,
        allowedValues: ['once', 'daily', 'weekly', 'monthly', 'quarterly', 'biannually', 'annually'],
      },
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Bills = new BillCollection();
