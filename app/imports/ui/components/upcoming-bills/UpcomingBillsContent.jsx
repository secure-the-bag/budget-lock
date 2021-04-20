import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Header } from 'semantic-ui-react';

const UpcomingBillsContent = (props) => {
  const until = props.bill.until ? props.bill.until.toLocaleDateString() : 'Not Specified';
  return (
      <Grid columns={4} centered>
        <Grid.Row>
          <Grid.Column as={Header}
                       size='medium'
                       content={props.bill.category}
                       subheader={'Category'}
                       textAlign='center'
          />
          <Grid.Column as={Header}
                       size='medium'
                       content={props.bill.frequency}
                       subheader={'Frequency'}
                       textAlign='center'
          />
          <Grid.Column as={Header}
                       size='medium'
                       content={until}
                       subheader={'Until'}
                       textAlign='center'
          />
          <Grid.Column>
            <Button>Edit</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
  );
};

UpcomingBillsContent.propTypes = {
  bill: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
};

export default (UpcomingBillsContent);
