import * as actionTypes from './actionTypes';
import { getPersistedState, persistState } from '../operations';

const STORAGE_KEY = 'LOGIN_REDUCER';
const ONE_HOUR = 60 * 60 * 1000;
const ONE_MINUTE = 1000 * 60;
const WRONG_PASSWORD_CODE = 'auth/wrong-password';
const defaultState = {
  isAuthenticated: false,
  tokenExpirationTimestamp: null,
  failedLogins: 0,
  lastLoginAttempt: null,
  error: {},
  isSocialMediaLogin: false,
  email: '',
  password: ''
};
const initialState = {
  ...defaultState,
  ...getPersistedState(STORAGE_KEY)
};
const itemsToPersist = ['isAuthenticated', 'tokenExpirationTimestamp', 'lastLoginAttempt', 'failedLogins', 'isSocialMediaLogin'];

export default function app(state = initialState, action) {
  let newState;

  switch (action.type) {
    case actionTypes.LOGIN_REQUEST: {
      newState = {
        ...state,
        lastLoginAttempt: Date.now()
      };
      break;
    }

    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.SIGN_IN_WITH_EMAIL_SUCCESS:
    case actionTypes.SIGN_UP_SUCCESS:
    case actionTypes.REFRESH_TOKEN_SUCCESS: {
      newState = {
        ...state,
        tokenExpirationTimestamp: Date.now() + ONE_HOUR,
        isAuthenticated: true,
        lastLoginAttempt: null,
        failedLogins: 0
      };
      break;
    }

    case actionTypes.SET_EMAIL: {
      newState = {
        ...state,
        email: action.email
      };
      break;
    }

    case actionTypes.SET_PASSWORD: {
      newState = {
        ...state,
        password: action.password
      };
      break;
    }

    case actionTypes.GITHUB_LOGIN_SUCCESS:
    case actionTypes.TWITTER_LOGIN_SUCCESS: {
      newState = {
        ...state,
        tokenExpirationTimestamp: Date.now() + ONE_HOUR,
        isAuthenticated: true,
        lastLoginAttempt: null,
        failedLogins: 0,
        isSocialMediaLogin: true
      };
      break;
    }

    case actionTypes.TWITTER_LOGIN_FAILURE:
    case actionTypes.GITHUB_LOGIN_FAILURE:
    case actionTypes.SIGN_UP_FAILURE:
    case actionTypes.LOGIN_FAILURE: {
      let newFailedLogins = state.failedLogins;
      if (action.error.code === WRONG_PASSWORD_CODE && (Date.now() - state.lastLoginAttempt) < ONE_MINUTE) {
        newFailedLogins++;
      }
      newState = {
        ...state,
        isAuthenticated: false,
        error: action.error,
        failedLogins: newFailedLogins
      };
      break;
    }

    case actionTypes.CLEAR_LOGIN_ERROR: {
      newState = {
        ...state,
        error: {}
      };
      break;
    }

    case actionTypes.LOGOUT_SUCCESS: {
      newState = {
        ...state,
        tokenExpirationTimestamp: null,
        isAuthenticated: false
      };
      break;
    }

    case actionTypes.SET_UNAUTHENTICATED: {
      newState = {
        ...state,
        isAuthenticated: false
      };
      break;
    }

    default: {
      return state;
    }
  }

  persistState(newState, itemsToPersist, STORAGE_KEY);

  return newState;
}
