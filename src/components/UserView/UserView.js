import React from 'react';
import PropTypes from 'prop-types';
import './UserView.scss';
import { DEFAULT_SETTINGS_JSON } from '../../enums';
import { USER_ROLES } from '../../enums';
import InputWithLabel from "../../components/InputWithLabel";
import Settings from '../../components/Settings';
import PhotoLoader from '../../components/PhotoLoader';

class UserView extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    currentDbUser: PropTypes.object.isRequired,
    user: PropTypes.object,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      displayName: props.user.displayName || '',
      email: props.user.email || '',
      photoURL: props.user.photoURL || '',
      role: props.user.role || USER_ROLES.REGULAR,
      settings: props.user.settings || DEFAULT_SETTINGS_JSON
    };

    this.photoFileToUpload = null;

    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        displayName: this.props.user.displayName || '',
        email: this.props.user.email || '',
        photoURL: this.props.user.photoURL || '',
        role: this.props.user.role || '',
        settings: this.props.user.settings || DEFAULT_SETTINGS_JSON
      });
    }
  }

  handleUserChanged() {
    this.props.onChange({...this.state, ...{ photoFileToUpload: this.photoFileToUpload }});
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    }, this.handleUserChanged);
  }

  getRoleOptions() {
    switch(this.props.currentDbUser.role) {
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
      default:
        return [
          USER_ROLES.REGULAR,
          USER_ROLES.USER_MANAGER
        ];
    }
  }

  handlePhotoChange(photoFile) {
    this.photoFileToUpload = photoFile;
    this.handleUserChanged();
  }

  handleRoleChange({ target: { value } }) {
    this.setState({ role: value }, this.handleUserChanged);
  }

  handleSettingsChange(settings) {
    this.setState({ settings }, this.handleUserChanged);
  }

  render() {
    const displayNameProps = { value: this.state.displayName, name:'displayName', onChange: this.handleInputChange };
    const emailProps = { value: this.state.email, name:'email', onChange: this.handleInputChange };
    return (
      <div className='user-view'>
        <PhotoLoader photoURL={this.state.photoURL} onChange={this.handlePhotoChange} />
        <InputWithLabel label="Name" inputProps={displayNameProps} />
        <InputWithLabel label="Email" inputProps={emailProps} />
        <div className='role-wrapper'>
          <label>Role</label>
          <select onChange={this.handleRoleChange} value={this.state.role}>
            {
              this.getRoleOptions().map((role, index) => {
                return <option key={index}>{role}</option>
              })
            }
          </select>
        </div>
        <Settings settings={this.state.settings} onChange={this.handleSettingsChange}/>
      </div>
    );
  }
}

export default UserView;
