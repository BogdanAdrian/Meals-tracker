import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import app from './app/reducer';
import login from './login/reducer';
import meals from './meals/reducer';
import users from './users/reducer';

const middlewareCandidates = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middlewareCandidates.push(createLogger());
}

const middleware = applyMiddleware(...middlewareCandidates);
const rootReducer = combineReducers({
  app,
  login,
  meals,
  users
});

export const store = createStore(
  rootReducer,
  middleware
);