import * as asyncActions from './asyncActions';


export function createUserFull(email, displayName, photoURL, role, settings) {
  return async(dispatch) => {
    const { user } = await dispatch(asyncActions.createUser(displayName, email, photoURL));
    await dispatch(asyncActions.createDbUser(user.uid, role, settings));

    return dispatch(asyncActions.getUsers());
  };
}

export function deleteUserFull(uid) {
  return async(dispatch) => {
    const promises = [dispatch(asyncActions.deleteUser(uid)), dispatch(asyncActions.deleteDbUser(uid))];
    await Promise.all(promises);

    return dispatch(asyncActions.getUsers());
  };
}