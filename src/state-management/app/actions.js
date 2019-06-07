import * as actionTypes from './actionTypes';

export function updateProfileRequest() {
  return {
    type: actionTypes.UPDATE_PROFILE_REQUEST
  };
}

export function updateProfileSuccess(user) {
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
    user
  };
}

export function updateProfileFailure(error) {
  return {
    type: actionTypes.UPDATE_PROFILE_FAILURE,
    error
  };
}

export function updateEmailRequest() {
  return {
    type: actionTypes.UPDATE_EMAIL_REQUEST
  };
}

export function updateEmailSuccess(user) {
  return {
    type: actionTypes.UPDATE_EMAIL_SUCCESS,
    user
  };
}

export function updateEmailFailure(error) {
  return {
    type: actionTypes.UPDATE_EMAIL_FAILURE,
    error
  };
}

export function uploadProfilePictureRequest() {
  return {
    type: actionTypes.UPLOAD_PROFILE_PICTURE_REQUEST
  };
}

export function uploadProfilePictureSuccess(snapshot) {
  return {
    type: actionTypes.UPLOAD_PROFILE_PICTURE_SUCCESS,
    snapshot
  };
}

export function uploadProfilePictureFailure(error) {
  return {
    type: actionTypes.UPLOAD_PROFILE_PICTURE_FAILURE,
    error
  };
}


export function getDBUserRequest() {
  return {
    type: actionTypes.GET_DB_USER_REQUEST
  };
}

export function getDBUserSuccess(dbUser) {
  return {
    type: actionTypes.GET_DB_USER_SUCCESS,
    dbUser
  };
}

export function getDBUserFailure(error) {
  return {
    type: actionTypes.GET_DB_USER_FAILURE,
    error
  };
}

export function openModal(modalName, modalParams) {
  return {
    type: actionTypes.OPEN_MODAL,
    modalName,
    modalParams
  };
}

export function closeModal() {
  return {
    type: actionTypes.CLOSE_MODAL
  };
}

export function updatePasswordRequest() {
  return {
    type: actionTypes.UPDATE_PASSWORD_REQUEST
  };
}

export function updatePasswordSuccess() {
  return {
    type: actionTypes.UPDATE_PASSWORD_SUCCESS
  };
}

export function updatePasswordFailure(error) {
  return {
    type: actionTypes.UPDATE_PASSWORD_FAILURE,
    error
  };
}

export function updateCurrentUserDb(dbUser) {
  return {
    type: actionTypes.UPDATE_CURRENT_USER_DB,
    dbUser
  }
}