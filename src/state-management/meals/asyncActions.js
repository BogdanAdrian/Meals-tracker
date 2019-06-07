import * as actions from './actions';
import * as firebase from 'firebase/app';
import { getUsers } from '../users/asyncActions';
import { uuidv4 } from '../../utils';
import axios from 'axios';
import "firebase/database";
import "firebase/auth";


export function getMeals(uid) {
  return async(dispatch) => {
    dispatch(actions.getMealsRequest());
    try {
      const userId = uid || firebase.auth().currentUser.uid;
      const snapshot = await firebase.database().ref('/meals/' + userId).once('value');

      return dispatch(actions.getMealsSuccess(snapshot.val()));
    } catch (error) {
      return dispatch(actions.getMealsFailure(error));
    }
  };
}

export function getAllMeals() {
  return async(dispatch) => {
    dispatch(actions.getAllMealsRequest());
    try {
      const snapshot = await firebase.database().ref('/meals').once('value');
      const allRawMeals = snapshot.val();
      const { users: allUsers } = await dispatch(getUsers());
      const allMeals = [];

      for (const userId in allRawMeals) {
        const userMeals = allRawMeals[userId];
        const currentUser = allUsers.find(user => user.uid === userId);

        for (const mealId in userMeals) {
          const meal = {
            ...userMeals[mealId],
            id: mealId,
            userDisplayName: currentUser.displayName,
            uid: currentUser.uid
          };

          allMeals.push(meal);
        }
      }

      return dispatch(actions.getAllMealsSuccess(allMeals));
    } catch (error) {
      return dispatch(actions.getAllMealsFailure(error));
    }
  };
}


export function addMeal(uid, datetime, text, noOfCalories) {
  return async(dispatch) => {
    dispatch(actions.addMealRequest());
    try {
      let isAdminTouch = false;
      if (uid) {
        isAdminTouch = true;
      }
      const userId = uid || firebase.auth().currentUser.uid;
      const updates = {};
      const mealId = uuidv4();

      updates['/meals/' + userId + '/' + mealId] = { datetime, text, noOfCalories };
      await firebase.database().ref().update(updates);

      const snapshot = await firebase.database().ref('/meals/' + userId).once('value');

      if (isAdminTouch) {
        dispatch(getAllMeals());
      } else {
        dispatch(getMeals(uid));
      }

      return dispatch(actions.addMealSuccess(snapshot.val()));
    } catch (error) {
      return dispatch(actions.addMealFailure(error));
    }
  };
}

export function deleteMeal(uid, mealId) {
  return async(dispatch) => {
    dispatch(actions.deleteMealRequest());
    try {
      const userId = uid || firebase.auth().currentUser.uid;

      firebase.database().ref('/meals/' + userId + '/' + mealId).remove();
      dispatch(getMeals(uid)); // todo move in composed async action

      return dispatch(actions.deleteMealSuccess());
    } catch (error) {
      return dispatch(actions.deleteMealFailure(error));
    }
  };
}

export function getMealCalories(food) {
  return async(dispatch) => {
    dispatch(actions.getMealCaloriesRequest());
    try {
      const applicationID = 'e23b8bd7';
      const applicationKey = 'dbc42bc95d493842e0a914f1bd3e7fe0';
      const nutrixUserId = 0;
      const baseURL = 'https://trackapi.nutritionix.com/v2';
      const defaultCal = '500';
      const config = {
        headers: {
          'x-app-id': applicationID,
          'x-app-key': applicationKey,
          'x-remote-user-id': nutrixUserId
        }
      };
      
      const { data } = await axios.get(baseURL + '/search/instant?query=' + food, config);
      const branded = data.branded;
      let sumCal = 0;
      for (let i = 0; i < branded.length; i++) {
        const element = branded[i];
        sumCal += Number.parseInt(element.nf_calories);
      }

      const result = Number.parseInt(sumCal / branded.length);

      return dispatch(actions.getMealCaloriesSuccess(result.toString() || defaultCal));
    } catch (error) {
      return dispatch(actions.getMealCaloriesFailure(error));
    }
  };
}

export function editMeal(uid, mealId, datetime, text, noOfCalories) {
  return async(dispatch) => {
    dispatch(actions.editMealRequest());
    try {
      let isAdminTouch = uid !== firebase.auth().currentUser.uid;
      const userId = uid || firebase.auth().currentUser.uid;
      const updates = {};

      updates['/meals/' + userId + '/' + mealId] = { datetime, text, noOfCalories };

      debugger;
      await firebase.database().ref().update(updates);
      debugger;
      
      if (isAdminTouch) {
        dispatch(getAllMeals());
      } else {
        dispatch(getMeals(uid));
      }

      return dispatch(actions.editMealSuccess());
    } catch (error) {
      return dispatch(actions.editMealFailure(error));
    }
  };
}
