import { saveState, getState } from '../components/utils/LocalStorage';

export function getPersistedState(storageKey) {
  return getState(storageKey);
}

export function persistState(state, attributes, storageKey) {
  if (!storageKey) {
    return;
  }

  const stateToPersist = {};

  for (const attr in state) {
    if (attributes.indexOf(attr) >= 0) {
      stateToPersist[attr] = state[attr];
    }
  }

  saveState(storageKey, stateToPersist);
}