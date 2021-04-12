import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon } from 'semantic-ui-react';

const UpcomingBillsItem = (props) => {
  console.log(props.bill);
  return (
      <Accordion.Title style={{ padding: '1.5rem', fontSize: '17px' }}>
        <Icon name='dropdown' />
        {props.bill.payee}
      </Accordion.Title>
  );
};

UpcomingBillsItem.propTypes = {
  bill: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
};

export default (UpcomingBillsItem);
