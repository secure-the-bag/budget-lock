import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import { Profiles } from '../../api/profile/Profile';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileItem extends React.Component {
    handleDelete = () => {
        const userToRemove = Meteor.users.find({ username: this.props.user.email })
            .fetch();
        Profiles.collection.remove({ _id: this.props.user._id });
        Meteor.users.remove(userToRemove[0]._id);
        swal('Successfully deleted!')
            .then(() => {
                // eslint-disable-next-line no-undef
                window.location = '/#/';
            });
    };

    handleClick = () => swal({
        text: `Are you sure you want to delete ${this.props.user.email}?`,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                this.handleDelete();
            } else {
                swal(`Canceled deleting ${this.props.user.email}`);
            }
        });

    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.user.email}</Table.Cell>
                <Table.Cell>
                    <Button negative onClick={this.handleClick}>
                        Delete
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    }
}

/** Require a document to be passed to this component. */
ProfileItem.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ProfileItem);
