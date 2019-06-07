import * as actionTypes from './actionTypes';

export function loginRequest() {
  return {
    type: actionTypes.LOGIN_REQUEST
  };
}

export function loginSuccess(user) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user
  };
}

export function loginFailure(error) {
  return {
    type: actionTypes.LOGIN_FAILURE,
    error
  };
}

export function twitterLoginRequest() {
  return {
    type: actionTypes.TWITTER_LOGIN_REQUEST
  };
}

export function twitterLoginSuccess(user) {
  return {
    type: actionTypes.TWITTER_LOGIN_SUCCESS,
    user
  };
}

export function twitterLoginFailure(error) {
  return {
    type: actionTypes.TWITTER_LOGIN_FAILURE,
    error
  };
}


export function githubLoginRequest() {
  return {
    type: actionTypes.GITHUB_LOGIN_REQUEST
  };
}

export function githubLoginSuccess(user) {
  return {
    type: actionTypes.GITHUB_LOGIN_SUCCESS,
    user
  };
}

export function githubLoginFailure(error) {
  return {
    type: actionTypes.GITHUB_LOGIN_FAILURE,
    error
  };
}

export function signUpRequest() {
  return {
    type: actionTypes.SIGN_UP_REQUEST
  };
}

export function signUpSuccess(user) {
  return {
    type: actionTypes.SIGN_UP_SUCCESS,
    user
  };
}

export function signUpFailure(error) {
  return {
    type: actionTypes.SIGN_UP_FAILURE,
    error
  };
}


export function validateEmailRequest() {
  return {
    type: actionTypes.VALIDATE_EMAIL_REQUEST
  };
}

export function validateEmailSuccess() {
  return {
    type: actionTypes.VALIDATE_EMAIL_SUCCESS
  };
}

export function validateEmailFailure(error) {
  return {
    type: actionTypes.VALIDATE_EMAIL_FAILURE,
    error
  };
}

export function clearLoginError() {
  return {
    type: actionTypes.CLEAR_LOGIN_ERROR
  };
}

export function logoutRequest() {
  return {
    type: actionTypes.LOGOUT_REQUEST
  };
}

export function logoutSuccess(user) {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    user
  };
}

export function logoutFailure(error) {
  return {
    type: actionTypes.LOGOUT_FAILURE,
    error
  };
}


export function refreshTokenRequest() {
  return {
    type: actionTypes.REFRESH_TOKEN_REQUEST
  };
}

export function refreshTokenSuccess(user) {
  return {
    type: actionTypes.REFRESH_TOKEN_SUCCESS,
    user
  };
}

export function refreshTokenFailure(error) {
  return {
    type: actionTypes.REFRESH_TOKEN_FAILURE,
    error
  };
}

export function setUnauthenticated() {
  return {
    type: actionTypes.SET_UNAUTHENTICATED
  };
}

export function disableAccountRequest() {
  return {
    type: actionTypes.DISABLE_ACCOUNT_REQUEST
  };
}

export function disableAccountSuccess() {
  return {
    type: actionTypes.DISABLE_ACCOUNT_SUCCESS
  };
}

export function disableAccountFailure(error) {
  return {
    type: actionTypes.DISABLE_ACCOUNT_FAILURE,
    error
  };
}

export function setEmail(email) {
  return {
    type: actionTypes.SET_EMAIL,
    email
  };
}

export function setPassword(password) {
  return {
    type: actionTypes.SET_PASSWORD,
    password
  };
}

export function fullLoginRequest() {
  return {
    type: actionTypes.FULL_LOGIN_REQUEST
  };
}

export function fullLoginSuccess(dbUser) {
  return {
    type: actionTypes.FULL_LOGIN_SUCCESS,
    dbUser
  };
}

export function fullLoginFailure(error) {
  return {
    type: actionTypes.FULL_LOGIN_FAILURE,
    error
  };
}


export function signInWithEmailRequest() {
  return {
    type: actionTypes.SIGN_IN_WITH_EMAIL_REQUEST
  };
}

export function signInWithEmailSuccess(user) {
  return {
    type: actionTypes.SIGN_IN_WITH_EMAIL_SUCCESS,
    user
  };
}

export function signInWithEmailFailure(error) {
  return {
    type: actionTypes.SIGN_IN_WITH_EMAIL_FAILURE,
    error
  };
}