import React from 'react';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Button, Modal } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  NumField,
  SelectField,
  SubmitField,
} from 'uniforms-semantic';
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';
import { getCategoryChoices } from '../utilities/GlobalFunctions';
import { Budget } from '../../api/budget/Budget';

const formSchema = new SimpleSchema({
  category: String,
  budget: Number,
});

const bridge = new SimpleSchema2Bridge(formSchema);

class AddBudget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  // Handles the state of the modal (close or open)
  handleModalOpen = () => this.setState({ modalOpen: true });

  handleModalClose = () => this.setState({ modalOpen: false });

  // On submit, insert data.
  submit(data) {
    const { budget, category } = data;
    const owner = Meteor.user().username;
    Budget.collection.insert({ owner, category, budget },
      { removeEmptyStrings: false },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Data added successfully', 'success').then(() => {
            this.handleModalClose();
          });
        }
      });
  }

  render() {

    function getCategories(currentBudget) {
      let categories = getCategoryChoices();
      const invalid = ['paycheck', 'creditCard', 'starting'];
      let current = currentBudget.map(currentBud => currentBud.category);
      current = current.concat(invalid);
      categories = categories.filter(category => !current.includes(category.value));
      return categories;
    }

    return (
      <Modal size='mini'
             closeIcon
             open={this.state.modalOpen}
             onClose={this.handleModalClose}
             onOpen={this.handleModalOpen}
             trigger={<Button>Add Budget</Button>}
      >
        <Modal.Header>Add Budget</Modal.Header>
        <Modal.Content>
          <AutoForm
                    schema={bridge}
                    onSubmit={data => { this.submit(data); }}>
            <SelectField name='category'
                         options={getCategories(this.props.budget)}/>
            <NumField name='budget'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </AutoForm>
        </Modal.Content>
      </Modal>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
AddBudget.propTypes = {
  budget: PropTypes.array.isRequired,
};

export default AddBudget;
