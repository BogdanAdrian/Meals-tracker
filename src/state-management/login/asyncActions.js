import * as actions from './actions';
import * as firebase from 'firebase/app';
import api from '../../api';
import "firebase/auth";
import "firebase/database";

export function validateEmail(user) {
  return async(dispatch) => {
    dispatch(actions.signUpRequest());
    try {
      const currentUser = firebase.auth().currentUser;
      await currentUser.sendEmailVerification();
      return dispatch(actions.validateEmailSuccess());
    } catch (error) {
      return dispatch(actions.validateEmailFailure(error));
    }
  };
}

export function signUp(email, password) {
  return async(dispatch) => {
    dispatch(actions.signUpRequest());
    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      return dispatch(actions.signUpSuccess(user));

    } catch (error) {
      return dispatch(actions.signUpFailure(error));
    }
  };
}

export function login(email, password) {
  return async(dispatch) => {
    dispatch(actions.loginRequest());
    try {
      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
      return dispatch(actions.loginSuccess(user));
    } catch (error) {
      return dispatch(actions.loginFailure(error));
    }
  };
}

export function twitterLogin() {
  return async(dispatch) => {
    dispatch(actions.twitterLoginRequest());

    try {
      const provider = new firebase.auth.TwitterAuthProvider();
      const { user } = await firebase.auth().signInWithPopup(provider);
      return dispatch(actions.twitterLoginSuccess(user));
    } catch (error) {
      return dispatch(actions.twitterLoginFailure(error));
    }
  };
}

export function githubLogin() {
  return async(dispatch) => {
    dispatch(actions.githubLoginRequest());

    try {
      const provider = new firebase.auth.GithubAuthProvider();
      const { user } = await firebase.auth().signInWithPopup(provider);
      return dispatch(actions.githubLoginSuccess(user));
    } catch (error) {
      return dispatch(actions.githubLoginFailure(error));
    }
  };
}

export function logout() {
  return async(dispatch) => {
    dispatch(actions.logoutRequest());
    try {
      await firebase.auth().signOut();
      return dispatch(actions.logoutSuccess());
    } catch (error) {
      return dispatch(actions.logoutFailure(error));
    }
  };
}

export function refreshToken() {
  return async(dispatch) => {
    dispatch(actions.refreshTokenRequest());
    try {
      await firebase.auth().currentUser.getIdToken(true);
      return dispatch(actions.refreshTokenSuccess(firebase.auth().currentUser));
    } catch (error) {
      return dispatch(actions.refreshTokenFailure(error));
    }
  };
}

export function disableAccount(email) {
  return async(dispatch) => {
    dispatch(actions.disableAccountRequest());
    try {
      const result = await api.post('/disableAccount', { email });
      return dispatch(actions.disableAccountSuccess(result));
    } catch (error) {
      return dispatch(actions.disableAccountFailure(error));
    }
  };
}

export function finishSignUp(email) {
  return async(dispatch) => {
    dispatch(actions.signInWithEmailRequest());
    try {

      const { user } = await firebase.auth().signInWithEmailLink(email, window.location.href)
      window.localStorage.removeItem('emailForSignIn');

      return dispatch(actions.signInWithEmailSuccess(user));
    } catch (error) {
      return dispatch(actions.signInWithEmailFailure(error));
    }
  };
}
