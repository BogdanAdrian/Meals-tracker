import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalHeader from "../../../components/ModalHeader";
import ModalFooter from "../../../components/ModalFooter";
import { closeModal } from "../../../state-management/app/actions";
import UserView from "../../../components/UserView";
import { uuidv4 } from '../../../utils';
import { createUserFull } from '../../../state-management/users/composedAsyncActions';
import { editUser, updateDbUser } from '../../../state-management/users/asyncActions';
import { uploadProfilePicture } from '../../../state-management/app/asyncActions';
import "./User.scss";

class User extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    user: PropTypes.object,
    dbUser: PropTypes.object,
    params: PropTypes.shape({
      user: PropTypes.object.isRequired
    }),
    createUserFull: PropTypes.func.isRequired,
    uploadProfilePicture: PropTypes.func.isRequired,
    updateDbUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      newUser: null
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  async handleAdd() {
    const profileUpdates = {
      displayName: this.state.newUser.displayName,
      email: this.state.newUser.email,
      role: this.state.newUser.role,
      settings: this.state.newUser.settings
    };

    if (this.state.newUser.photoFileToUpload) {
      const newUserId = uuidv4();
      const { snapshot } = await this.props.uploadProfilePicture(
        newUserId,
        this.state.newUser.photoFileToUpload
      );

      if (snapshot) {
        profileUpdates.photoURL = await snapshot.metadata.ref.getDownloadURL();
      }
    }

    this.props.createUserFull(profileUpdates.email, profileUpdates.displayName, profileUpdates.photoURL || '', profileUpdates.role, profileUpdates.settings);
  }

  async handleEdit() {
    const { user: oldUser } = this.props.params;
    const { newUser } = this.state;   
    const profileUpdates = {};
    if (newUser.photoFileToUpload) {
      const { snapshot } = await this.props.uploadProfilePicture(
        oldUser.uid,
        newUser.photoFileToUpload
      );

      if (snapshot) {
        profileUpdates.photoURL = await snapshot.metadata.ref.getDownloadURL();
      }
    }
    if (newUser.displayName !== oldUser.displayName || newUser.photoURL !== oldUser.photoURL || newUser.email !== oldUser.email) {
      this.props.editUser(oldUser.uid, newUser.displayName, newUser.email, newUser.photoURL);
    }
    if (newUser.role !== oldUser.role || newUser.settings !== oldUser.settings) {
      this.props.updateDbUser(oldUser.uid, newUser.role, newUser.settings);
    }
  }

  async handleConfirm() {
    if (this.props.params.user.uid) {
      this.handleEdit();
    } else {
      this.handleAdd();
    }
    this.props.closeModal();
  }

  handleUserChange(newUser) {
    this.setState({ newUser: {...newUser} });
  }

  disableConfirmButton() {
    return !this.state.newUser || !this.state.newUser.displayName || !this.state.newUser.email || !this.state.newUser.role || !this.state.newUser.settings;
  }

  render() {
    const { user, dbUser, params, closeModal } = this.props;
    return (
      <div className="user">
        <ModalHeader title="Add/edit user" onClose={closeModal} />
        <div className="user-modal-body">
          <UserView
            onChange={this.handleUserChange}
            currentUser={user}
            currentDbUser={dbUser}
            user={params.user}
          />
        </div>
        <ModalFooter
          onCancel={closeModal}
          onConfirm={this.handleConfirm}
          disableConfirmButton={this.disableConfirmButton()}
        />
      </div>
    );
  }
}

function mapStateToProps({ app: { user, dbUser } }) {
  return {
    user,
    dbUser
  };
}

const mapDispatchToProps = {
  closeModal,
  createUserFull,
  uploadProfilePicture,
  updateDbUser,
  editUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
