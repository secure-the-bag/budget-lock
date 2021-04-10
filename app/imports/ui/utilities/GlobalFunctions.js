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

export const validateOptionalFields = (data) => {
  const payee = (typeof data.payee === 'string') ? data.payee : '';
  const name = (typeof data.name === 'string') ? data.name : '';
  const notes = (typeof data.notes === 'string') ? data.notes : '';

  return { payee, name, notes };
};
