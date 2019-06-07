import * as actions from './actions';
import * as firebase from 'firebase/app';
import { updateCurrentUserDb } from '../app/actions';
import api from '../../api';
import "firebase/database";
import "firebase/auth";


export function getUsers(userId) {
  return async(dispatch) => {
    dispatch(actions.getUsersRequest());
    try {
      const uid = userId || firebase.auth().currentUser.uid;
      const { data: { users } } = await api.post('/getAllUsers', { loggedInUserId: uid });

      const snapshot = await firebase.database().ref('/users').once('value');
      const dbUsers = snapshot.val();

      // merge the two objects
      const finalUsers = [];
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        const dbUser = dbUsers[user.uid];
        const finalUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: dbUser.role,
          settings: dbUser.settings
        };
        finalUsers.push(finalUser);
      }

      return dispatch(actions.getUsersSuccess(finalUsers));
    } catch (error) {
      return dispatch(actions.getUsersFailure(error));
    }
  };
}

export function createDbUser(uid, role, settings) {
  return async(dispatch) => {
    dispatch(actions.createDBUserRequest());
    try {
      const updates = {};
      updates['/users/' + uid] = { role, settings };

      await firebase.database().ref().update(updates);

      const snapshot = await firebase.database().ref('/users/' + uid).once('value');

      return dispatch(actions.createDBUserSuccess(snapshot.val()));
    } catch (error) {
      return dispatch(actions.createDBUserFailure(error));
    }
  };
}

export function createUser(displayName, email, photoURL) {
  return async(dispatch) => {
    dispatch(actions.createUserRequest());
    try {
      const uid = firebase.auth().currentUser.uid;
      const userUpdates = {
        email,
        displayName
      };
      if (photoURL) {
        userUpdates.photoURL = photoURL;
      }
      const { data: newUser } = await api.post('/createUser', { loggedInUserId: uid, userUpdates });

      return dispatch(actions.createUserSuccess(newUser));
    } catch (error) {
      return dispatch(actions.createUserFailure(error));
    }
  }
}


export function updateDbUser(uid, role, settings) {
  return async(dispatch) => {
    dispatch(actions.updateDBUserRequest());
    try {
      const settingsUpdates = {};
      settingsUpdates['/users/' + uid + '/settings'] = settings;
      await firebase.database().ref().update(settingsUpdates);
      
      const roleUpdates = {};
      if (role) {
        roleUpdates['/users/' + uid + '/role'] = role;
        await firebase.database().ref().update(roleUpdates);
      }

      const snapshot = await firebase.database().ref('/users/' + uid).once('value');

      dispatch(getUsers());

      if (firebase.auth().currentUser.uid === uid) {
        return dispatch(updateCurrentUserDb(snapshot.val()));
      }

      return dispatch(actions.updateDBUserSuccess(snapshot.val()));
    } catch (error) {
      return dispatch(actions.updateDBUserFailure(error));
    }
  };
}

export function editUser(uid, displayName, email, photoURL) {
  return async(dispatch) => {
    dispatch(actions.editUserRequest());
    try {
      const currentUserId = firebase.auth().currentUser.uid;
      const userUpdates = {
        email,
        displayName
      };
      if (photoURL) {
        userUpdates.photoURL = photoURL;
      }
      const { data: updatedUser } = await api.post('/updateUser', { loggedInUserId: currentUserId, uid, userUpdates });

      dispatch(getUsers());

      return dispatch(actions.editUserSuccess(updatedUser));
    } catch (error) {
      return dispatch(actions.editUserFailure(error));
    }
  }
}

export function deleteDbUser(uid) {
  return async(dispatch) => {
    dispatch(actions.deleteDBUserRequest());
    try {
      await firebase.database().ref('/users/' + uid).remove();

      return dispatch(actions.deleteDBUserSuccess());
    } catch (error) {
      return dispatch(actions.deleteDBUserFailure(error));
    }
  }
}

export function deleteUser(uid) {
  return async(dispatch) => {
    dispatch(actions.createUserRequest());
    try {
      const loggedInUserId = firebase.auth().currentUser.uid;

      await api.post('/deleteUser', { loggedInUserId, uid });

      return dispatch(actions.createUserSuccess());
    } catch (error) {
      return dispatch(actions.createUserFailure(error));
    }
  }
}


export function sendEmailInvitation(email) {
  return async(dispatch) => {
    dispatch(actions.sendEmailInvitationRequest());
    try {
      firebase.auth();
      var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'https://stayhealthy-94800.firebaseapp.com/#/finishSignUp',
        // This must be true.
        handleCodeInApp: true
      };
      const resp = await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);

      return dispatch(actions.sendEmailInvitationSuccess(resp));
    } catch (error) {
      return dispatch(actions.sendEmailInvitationFailure(error));
    }
  }
}

