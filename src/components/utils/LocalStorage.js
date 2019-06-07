const REFRESH_TOKEN = 'refresh_token';
const ACCESS_TOKEN = 'access_token';

export function saveToken(token) {
  saveState(REFRESH_TOKEN, token);
}

export function getToken() {
  getState(ACCESS_TOKEN);
}

export function saveState(key, state) {
  if (!key) {
    throw new Error('A key must be provided along with the state to be saved inside the local storage.');
  }
  const formerSavedState = JSON.parse(localStorage.getItem(key)) || {};
  const stateToSave = Object.assign({}, formerSavedState, state);

  localStorage.setItem(key, JSON.stringify(stateToSave));

  return stateToSave;
}

export function getState(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function clearState(key) {
  localStorage.removeItem(key);
}
