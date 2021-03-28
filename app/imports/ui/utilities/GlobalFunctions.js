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

export const getCategoryEquivalent = (category, type) => ((type === 'label') ?
    getCategoryChoices().find(({ value }) => value === category).label :
    getCategoryChoices().find(({ label }) => label === category).value);
