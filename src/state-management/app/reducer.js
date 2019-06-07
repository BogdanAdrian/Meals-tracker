import * as loginActionTypes from '../login/actionTypes';
import * as actionTypes from './actionTypes';
import { getPersistedState, persistState } from '../operations';

const STORAGE_KEY = 'APP_REDUCER';
const defaultState = {
  user: {},
  dbUser: {},
  modalToShow: '',
  modalParams: {},
  userUpdated: false
};
const initialState = {
  ...defaultState,
  ...getPersistedState(STORAGE_KEY)
};
const itemsToPersist = ['user', 'dbUser'];

export default function app(state = initialState, action) {
  let newState;

  switch (action.type) {
    case loginActionTypes.TWITTER_LOGIN_SUCCESS:
    case loginActionTypes.GITHUB_LOGIN_SUCCESS:
    case loginActionTypes.SIGN_UP_SUCCESS:
    case loginActionTypes.SIGN_IN_WITH_EMAIL_SUCCESS:
    case loginActionTypes.REFRESH_TOKEN_SUCCESS:
    case loginActionTypes.LOGIN_SUCCESS: {
      newState = {
        ...state,
        user: action.user
      };
      break;
    }

    case loginActionTypes.FULL_LOGIN_SUCCESS: {
      newState = {
        ...state,
        dbUser: action.dbUser
      };
      break;
    }

    case loginActionTypes.LOGOUT_SUCCESS: {
      newState = {
        ...state,
        user: {},
        dbUser: {}
      };
      break;
    }

    case actionTypes.OPEN_MODAL: {
      newState = {
        ...state,
        modalToShow: action.modalName,
        modalParams: action.modalParams
      };
      break;
    }

    case actionTypes.CLOSE_MODAL: {
      newState = {
        ...state,
        modalToShow: '',
        modalParams: {}
      };
      break;
    }

    case actionTypes.UPDATE_CURRENT_USER_DB: {
      newState = {
        ...state,
        dbUser: action.dbUser
      };
      break;
    }

    case loginActionTypes.SET_UNAUTHENTICATED: {
      newState = {
        ...state,
        user: null
      }
      break;
    }

    case actionTypes.UPDATE_EMAIL_SUCCESS:
    case actionTypes.UPDATE_PROFILE_SUCCESS: {
      newState = {
        ...state,
        user: action.user,
        userUpdated: !state.userUpdated
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
