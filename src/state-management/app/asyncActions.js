import * as actions from './actions';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import "firebase/auth";
import "firebase/database";

export function updateProfile(profileUpdates) {
  return async(dispatch) => {
    dispatch(actions.updateProfileRequest());
    try {
      await firebase.auth().currentUser.updateProfile(profileUpdates);
      return dispatch(actions.updateProfileSuccess(firebase.auth().currentUser));
    } catch (error) {
      return dispatch(actions.updateProfileFailure(error));
    }
  };
}

export function getDBUser() {
  return async(dispatch) => {
    dispatch(actions.getDBUserRequest());
    try {
      const userId = firebase.auth().currentUser.uid;
      const snapshot = await firebase.database().ref('/users/' + userId).once('value');
      return dispatch(actions.getDBUserSuccess(snapshot.val()));
    } catch (error) {
      return dispatch(actions.getDBUserFailure(error));
    }
  };
}

export function updateEmail(email) {
  return async(dispatch) => {
    dispatch(actions.updateEmailRequest());
    try {
      await firebase.auth().currentUser.updateEmail(email);
      return dispatch(actions.updateEmailSuccess(firebase.auth().currentUser));
    } catch (error) {
      return dispatch(actions.updateEmailFailure(error));
    }
  };
}

export function uploadProfilePicture(userId, photoFile) {
  return async(dispatch) => {
    dispatch(actions.uploadProfilePictureRequest());
    try {
      const storageRef = firebase.storage().ref();
      const photoRef = storageRef.child('/' + userId + '/profile-picture.jpg');
      const snapshot = await photoRef.put(photoFile);
      return dispatch(actions.uploadProfilePictureSuccess(snapshot));
    } catch (error) {
      return dispatch(actions.uploadProfilePictureFailure(error));
    }
  };
}

export function updatePassword(newPassword) {
  return async(dispatch) => {
    dispatch(actions.updatePasswordRequest());
    try {
      const resp = await firebase.auth().currentUser.updatePassword(newPassword);

      return dispatch(actions.updatePasswordSuccess(resp));
    } catch (error) {
      return dispatch(actions.updatePasswordFailure(error));
    }
  };
}