import * as actionTypes from './actionTypes';

export function getUsersRequest() {
  return {
    type: actionTypes.GET_USERS_REQUEST
  };
}

export function getUsersSuccess(users) {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    users
  };
}

export function getUsersFailure(error) {
  return {
    type: actionTypes.GET_USERS_FAILURE,
    error
  };
}

export function editUserRequest() {
  return {
    type: actionTypes.EDIT_USER_REQUEST
  };
}

export function editUserSuccess(users) {
  return {
    type: actionTypes.EDIT_USER_SUCCESS,
    users
  };
}

export function editUserFailure(error) {
  return {
    type: actionTypes.EDIT_USER_FAILURE,
    error
  };
}


export function deleteUserRequest() {
  return {
    type: actionTypes.DELETE_USER_REQUEST
  };
}

export function deleteUserSuccess(users) {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    users
  };
}

export function deleteUserFailure(error) {
  return {
    type: actionTypes.DELETE_USER_FAILURE,
    error
  };
}

export function createDBUserRequest() {
  return {
    type: actionTypes.CREATE_DB_USER_REQUEST
  };
}

export function createDBUserSuccess(dbUser) {
  return {
    type: actionTypes.CREATE_DB_USER_SUCCEESS,
    dbUser
  };
}

export function createDBUserFailure(error) {
  return {
    type: actionTypes.CREATE_DB_USER_FAILURE,
    error
  };
}

export function updateDBUserRequest() {
  return {
    type: actionTypes.UPDATE_DB_USER_REQUEST
  };
}

export function updateDBUserSuccess(dbUser) {
  return {
    type: actionTypes.UPDATE_DB_USER_SUCCEESS,
    dbUser
  };
}

export function updateDBUserFailure(error) {
  return {
    type: actionTypes.UPDATE_DB_USER_FAILURE,
    error
  };
}


export function createUserRequest() {
  return {
    type: actionTypes.CREATE_USER_REQUEST
  };
}

export function createUserSuccess(user) {
  return {
    type: actionTypes.CREATE_USER_SUCCEESS,
    user
  };
}

export function createUserFailure(error) {
  return {
    type: actionTypes.CREATE_USER_FAILURE,
    error
  };
}


export function sendEmailInvitationRequest() {
  return {
    type: actionTypes.SEND_EMAIL_INVITATION_REQUEST
  };
}

export function sendEmailInvitationSuccess(resp) {
  return {
    type: actionTypes.SEND_EMAIL_INVITATION_SUCCESS,
    resp
  };
}

export function sendEmailInvitationFailure(error) {
  return {
    type: actionTypes.SEND_EMAIL_INVITATION_FAILURE,
    error
  };
}


export function deleteDBUserRequest() {
  return {
    type: actionTypes.DELETE_DB_USER_REQUEST
  };
}

export function deleteDBUserSuccess(dbUser) {
  return {
    type: actionTypes.DELETE_DB_USER_SUCCEESS,
    dbUser
  };
}

export function deleteDBUserFailure(error) {
  return {
    type: actionTypes.DELETE_DB_USER_FAILURE,
    error
  };
}