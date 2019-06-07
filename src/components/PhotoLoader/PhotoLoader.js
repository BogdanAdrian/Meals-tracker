import React from 'react';
import PropTypes from 'prop-types';

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultUserPhoto from "../../assets/default-user.png";
import './PhotoLoader.scss';

library.add(faPen);

class PhotoLoader extends React.Component {
  static propTypes = {
    photoURL: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      photoURL: props.photoURL || ''
    };

    this.photoFileToUpload = null;

    this.handleProfilePictureClick = this.handleProfilePictureClick.bind(this);
  }

  handleProfilePictureClick({ target }) {
    this.setState(
      {
        photoURL: URL.createObjectURL(target.files[0])
      },
      () => {
        this.photoFileToUpload = target.files[0];
        this.props.onChange(this.photoFileToUpload);
      }
    );
  }

  render() {
    return (
      <div className="photo-loader">
        <img
          className="profile-picture"
          alt="user"
          src={this.state.photoURL || DefaultUserPhoto}
        />
        <label htmlFor="upload-picture">
          <FontAwesomeIcon icon="pen" />
        </label>
        <input
          type="file"
          name="upload-picture"
          id="upload-picture"
          onChange={this.handleProfilePictureClick}
        />
      </div>
    );
  }
}

export default PhotoLoader;
