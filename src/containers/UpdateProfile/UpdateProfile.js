import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// components
import InputWithLabel from "../../components/InputWithLabel";
import SelectWithLabel from "../../components/SelectWithLabel";
import PhotoLoader from '../../components/PhotoLoader';
import Settings from '../../components/Settings';
// state-management
import { updateProfile, updateEmail, uploadProfilePicture, updatePassword } from '../../state-management/app/asyncActions';
import { updateDbUser } from '../../state-management/users/asyncActions';
// others
import "./UpdateProfile.scss";
import { USER_ROLES } from "../../enums";
import { SAVE } from "./constants";


class UpdateProfile extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dbUser: PropTypes.object,
    uploadProfilePicture: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    updateDbUser: PropTypes.func.isRequired,
    updateEmail: PropTypes.func.isRequired,
    updatePassword: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      email: props.user.email || "",
      displayName: props.user.displayName || "",
      photoURL: props.user.photoURL,
      role: props.dbUser.role,
      settings: props.dbUser.settings,
      password: ''
    };

    this.photoFileToUpload = null;

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleProfilePictureClick = this.handleProfilePictureClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleProfilePictureClick(photoFile) {
    this.photoFileToUpload = photoFile;
  }

  isSaveDisabled() {
    return !this.state.displayName || !this.state.email;
  }

  updateProfile(profileUpdates) {
    return this.props.updateProfile(profileUpdates);
  }
  updateEmail() {
    return this.props.updateEmail(this.state.email);
  }
  updateDbUser() {
    const newRole = this.props.dbUser.role === USER_ROLES.REGULAR ? null : this.state.role;
    return this.props.updateDbUser(this.props.user.uid, newRole, this.state.settings);
  }

  async handleSave() {
    const { user, dbUser } = this.props;
    const profileUpdates = {
      displayName: this.state.displayName
    };

    if (this.photoFileToUpload) {
      const { snapshot } = await this.props.uploadProfilePicture(
        user.uid,
        this.photoFileToUpload
      );

      if (snapshot) {
        profileUpdates.photoURL = await snapshot.metadata.ref.getDownloadURL();
      }
    }

    if (this.state.password) {
      this.props.updatePassword(this.state.password);
    }

    if (profileUpdates.displayName !== user.displayName || this.photoFileToUpload) {
      this.updateProfile(profileUpdates);
    }
    if (this.state.settings !== dbUser.settings ||
      this.state.role !== dbUser.role) {
      this.updateDbUser();
    }
    if (this.state.email !== user.email) {
      this.updateEmail();
    }
  }

  handleRoleChange(newValue) {
    this.setState({ role: newValue });
  }

  handleSettingsChange(settings) {
    this.setState({ settings });
  }

  getRoleOptions() {
    switch(this.props.dbUser.role) {
      case USER_ROLES.ADMIN:
        return [
          USER_ROLES.REGULAR,
          USER_ROLES.USER_MANAGER,
          USER_ROLES.ADMIN
        ];
      case USER_ROLES.USER_MANAGER:
        return [
          USER_ROLES.REGULAR,
          USER_ROLES.USER_MANAGER
        ];
      case USER_ROLES.REGULAR:
        return [USER_ROLES.REGULAR];
      default:
        return [USER_ROLES.REGULAR];
    }
  }

  render() {
    const emailInputProps = {
      required: true,
      name: "email",
      value: this.state.email,
      placeholder: "example@domain.com",
      onChange: this.handleOnChange
    };
    const displayNameInputProps = {
      required: true,
      name: "displayName",
      value: this.state.displayName,
      placeholder: "John Doe",
      onChange: this.handleOnChange
    };
    const passwordProps = {
      value: this.state.password,
      name: 'password',
      placeholder: "password",
      type: 'password',
      onChange: this.handleOnChange
    };

    return (
      <div className="update-profile">
        <PhotoLoader photoURL={this.state.photoURL} onChange={this.handleProfilePictureClick}/>
        <InputWithLabel inputProps={emailInputProps} label="Email" />
        <InputWithLabel inputProps={displayNameInputProps} label="Name" />
        <InputWithLabel inputProps={passwordProps} label="Password" />
        {
          this.props.dbUser && this.props.dbUser.settings && this.props.dbUser.role &&
            <React.Fragment>
              <SelectWithLabel
                label="Role"
                onChange={this.handleRoleChange}
                options={this.getRoleOptions()}
                defaultValue={this.props.dbUser.role}
                disabled={this.props.dbUser.role === USER_ROLES.REGULAR}
              />
              <Settings settings={this.props.dbUser.settings} onChange={this.handleSettingsChange}/>
            </React.Fragment>
        }
        <button
          className={`save ${this.isSaveDisabled() ? "disabled" : ""}`}
          disabled={this.isSaveDisabled()}
          onClick={this.handleSave}
        >
          {SAVE}
        </button>
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
  uploadProfilePicture,
  updateProfile,
  updateDbUser,
  updateEmail,
  updatePassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfile);
