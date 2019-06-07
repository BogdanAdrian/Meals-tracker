import * as actionTypes from './actionTypes';

export function getMealsRequest() {
  return {
    type: actionTypes.GET_MEALS_REQUEST
  };
}

export function getMealsSuccess(meals) {
  return {
    type: actionTypes.GET_MEALS_SUCCESS,
    meals
  };
}

export function getMealsFailure(error) {
  return {
    type: actionTypes.GET_MEALS_FAILURE,
    error
  };
}


export function addMealRequest() {
  return {
    type: actionTypes.ADD_MEAL_REQUEST
  };
}

export function addMealSuccess(meals) {
  return {
    type: actionTypes.ADD_MEAL_SUCCESS,
    meals
  };
}

export function addMealFailure(error) {
  return {
    type: actionTypes.ADD_MEAL_FAILURE,
    error
  };
}


export function editMealRequest() {
  return {
    type: actionTypes.EDIT_MEAL_REQUEST
  };
}

export function editMealSuccess(meals) {
  return {
    type: actionTypes.EDIT_MEAL_SUCCESS,
    meals
  };
}

export function editMealFailure(error) {
  return {
    type: actionTypes.EDIT_MEAL_FAILURE,
    error
  };
}


export function deleteMealRequest() {
  return {
    type: actionTypes.DELETE_MEAL_REQUEST
  };
}

export function deleteMealSuccess(meals) {
  return {
    type: actionTypes.DELETE_MEAL_SUCCESS,
    meals
  };
}

export function deleteMealFailure(error) {
  return {
    type: actionTypes.DELETE_MEAL_FAILURE,
    error
  };
}


export function getMealCaloriesRequest() {
  return {
    type: actionTypes.GET_MEAL_CALORIES_REQUEST
  };
}

export function getMealCaloriesSuccess(noOfCalories) {
  return {
    type: actionTypes.GET_MEAL_CALORIES_SUCCESS,
    noOfCalories
  };
}

export function getMealCaloriesFailure(error) {
  return {
    type: actionTypes.GET_MEAL_CALORIES_FAILURE,
    error
  };
}

export function getAllMealsRequest() {
  return {
    type: actionTypes.GET_ALL_MEALS_REQUEST
  };
}

export function getAllMealsSuccess(meals) {
  return {
    type: actionTypes.GET_ALL_MEALS_SUCCESS,
    meals
  };
}

export function getAllMealsFailure(error) {
  return {
    type: actionTypes.GET_ALL_MEALS_FAILURE,
    error
  };
}