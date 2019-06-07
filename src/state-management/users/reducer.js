import * as actionTypes from './actionTypes';

const initialState = {
  users: []
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: action.users
      };
    }

    default: {
      return state;
    }
  }
}
