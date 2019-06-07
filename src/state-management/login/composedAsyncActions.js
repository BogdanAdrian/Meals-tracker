import * as asyncActions from './asyncActions';
import * as appAsyncActions from '../app/asyncActions';
import * as usersAsyncActions from '../users/asyncActions';
import * as actionTypes from './actionTypes';
import * as usersActionTypes from '../users/actionTypes';
import * as actions from './actions';
import { USER_ROLES, DEFAULT_SETTINGS_JSON } from '../../enums';

/**
 * First creates the Firebase user, then it sends the validation email and then adds in the DB a record for this user.
 * @param {String} email user's email
 * @param {String} password user's password
 */
export function signUpFull(email, password) {
  return async(dispatch) => {
    dispatch(actions.fullLoginRequest());
    try {
      const singUpAction = await dispatch(asyncActions.signUp(email, password));
      if (singUpAction.type === actionTypes.SIGN_UP_FAILURE) {
        return dispatch(actions.fullLoginFailure(singUpAction.error));
      }
      const validateEmailAction = await dispatch(asyncActions.validateEmail(singUpAction.user));
      if (validateEmailAction.type === actionTypes.VALIDATE_EMAIL_FAILURE) {
        return dispatch(actions.fullLoginFailure(validateEmailAction.error));
      }
      const { dbUser } = await dispatch(usersAsyncActions.createDbUser(singUpAction.user.uid, USER_ROLES.REGULAR, DEFAULT_SETTINGS_JSON));

      return dispatch(actions.fullLoginSuccess(dbUser));
    } catch(error) {
      return dispatch(actions.fullLoginFailure(error));
    }
  };
}

export function fullLogin(email, password) {
  return async(dispatch) => {
    dispatch(actions.fullLoginRequest());
    try {
      const { user } = await dispatch(asyncActions.login(email, password));
      debugger;
      const { dbUser } = await dispatch(appAsyncActions.getDBUser());

      return dispatch(actions.fullLoginSuccess(dbUser));
    } catch(error) {
      return dispatch(actions.fullLoginFailure(error));
    }
  };
}

export function twitterLoginFull() {
  return async(dispatch) => {
    dispatch(actions.fullLoginRequest());
    try {
      const twitterLoginAction = await dispatch(asyncActions.twitterLogin());
      if (twitterLoginAction.type === actionTypes.TWITTER_LOGIN_FAILURE) {
        return dispatch(actions.fullLoginFailure(twitterLoginAction.error));
      }
      const { dbUser } = await dispatch(appAsyncActions.getDBUser());
      if (!dbUser) {
        var createDbUserAction = await dispatch(usersAsyncActions.createDbUser(twitterLoginAction.user.uid, USER_ROLES.REGULAR, DEFAULT_SETTINGS_JSON));
        
        if (createDbUserAction.type === usersActionTypes.CREATE_DB_USER_FAILURE) {
          return dispatch(actions.fullLoginFailure(createDbUserAction.error));
        }
      }

      return dispatch(actions.fullLoginSuccess(dbUser || createDbUserAction.dbUser));
    } catch(error) {
      return dispatch(actions.fullLoginFailure(error));
    }
  };
}

export function githubLoginFull() {
  return async(dispatch) => {
    dispatch(actions.fullLoginRequest());
    try {
      const githubLoginAction = await dispatch(asyncActions.githubLogin());
      if (githubLoginAction.type === actionTypes.GITHUB_LOGIN_FAILURE) {
        return dispatch(actions.fullLoginFailure(githubLoginAction.error));
      }
      const { dbUser } = await dispatch(appAsyncActions.getDBUser());
      if (!dbUser) {
        var createDbUserAction = await dispatch(usersAsyncActions.createDbUser(githubLoginAction.user.uid, USER_ROLES.REGULAR, DEFAULT_SETTINGS_JSON));
        
        if (createDbUserAction.type === usersActionTypes.CREATE_DB_USER_FAILURE) {
          return dispatch(actions.fullLoginFailure(dbUser || createDbUserAction.error));
        }
      }

      return dispatch(actions.fullLoginSuccess(createDbUserAction.dbUser));
    } catch(error) {
      return dispatch(actions.fullLoginFailure(error));
    }
  };
}
