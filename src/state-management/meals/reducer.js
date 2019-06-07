import * as actionTypes from './actionTypes';
import { mealsObjectToArray } from './operations';

const initialState = {
  meals: [],
  allMeals: []
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_MEALS_SUCCESS: {
      return {
        ...state,
        meals: mealsObjectToArray(action.meals)
      };
    }

    case actionTypes.GET_ALL_MEALS_SUCCESS: {
      return {
        ...state,
        allMeals: action.meals
      };
    }

    default: {
      return state;
    }
  }
}
