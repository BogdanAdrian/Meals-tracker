const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const cors = require('cors')({
  origin: true
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.disableAccount = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    admin.auth().getUserByEmail(request.body.email)
      .then((user) => {
        admin.auth().updateUser(user.uid, { disabled: true })
          .then((userRecord) => {
            const responseBody = { text: 'User has been disabled.', user: userRecord.toJSON() };
            response.status(200).send(responseBody);
            return responseBody;
          })
          .catch((error) => {
            response.status(500).send({ text: 'User has not been disabled.', error: error });
          });
        return null;
      })
      .catch((error) => {
        response.status(500).send({ text: 'User has not been disabled.', error: error });
      })
  });
});

exports.getAllUsers = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    // validate user's rights on seeinig the users list
    admin.database().ref('/users/' + request.body.loggedInUserId).once('value')
      .then(dbUser => {
        if (!dbUser || (dbUser.role === 'REGULAR')) {
          response.status(500).send({ text: 'You are not permitted to do this action.', error: { dbUser }});
          return 'You are not permitted to do this action.';
        }

        admin.auth().listUsers(1000)
          .then(resp => {
            response.status(200).send(resp);
            return resp;
          })
          .catch(error => {
            response.status(500).send({ text: 'Fetching the users failed.', error: error });
          });
        return {text: 'it reached this far'};
      })
      .catch(error => {
        response.status(500).send({ text: 'The provided uid does not exist', error: error });
      })
  });
});

exports.createUser = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    // validate user's rights on seeinig the users list
    admin.database().ref('/users/' + request.body.loggedInUserId).once('value')
      .then(dbUser => {
        if (!dbUser || dbUser.role === 'REGULAR') {
          response.status(500).send({ text: 'You are not permitted to do this action.', error: { dbUser }});
          return 'You are not permitted to do this action.';
        }

        admin.auth().createUser({
          email: request.body.userUpdates.email,
          emailVerified: false,
          password: 'password',
          displayName: request.body.userUpdates.displayName,
          photoURL: request.body.userUpdates.photoURL,
          disabled: false
        })
          .then(newUser => {
            // var actionCodeSettings = { url: 'https://stayhealthy-94800.firebaseapp.com' };
            // admin.auth()
            //   .generatePasswordResetLink(request.body.userUpdates.email, actionCodeSettings)
            //   .then((resetLink) => {
            //     response.status(200).send({ newUser, resetLink});
            //     return { newUser, resetLink};
            //   })
            //   .catch((error) => {
            //     response.status(500).send({ text: 'Could not send reset password link.', error: error });
            //   });
            response.status(200).send(newUser);
            return {newUser};
          })
          .catch(error => {
            response.status(500).send({ text: 'Creating user has failed.', error: error });
          });

        return {text: 'it reached this far'};
      })
      .catch(error => {
        response.status(500).send({ text: 'The provided uid does not exist', error: error });
      })
  });
});

// todo send reset password email
function sendVerificationEmail(userRecord) {
  const API_KEY = 'AIzaSyD75XpESSE_xlos2lw_CPdQj_KtyvigIUM'; // todo export in json
  return admin.auth().createCustomToken(userRecord.uid).then(function (customToken) {
    var header = {
      'Content-Type': 'application/json'
    }
    return request({
      url: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=" + API_KEY,
      method: 'POST',
      json: { "token": customToken, "returnSecureToken": true },
      headers: header
    },
      function (error, response, body) {
        if (error) {
          console.log('unable to post request to send swap custom token for id token', error);
          return;
        }
        if (body.error) {
          console.log('unable to swap custom token for idtoken with error', body.error);
          return;
        } else {
          return request({
            url: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=" + API_KEY,
            method: 'POST',
            json: { "requestType": "VERIFY_EMAIL", "idToken": body.idToken },
            headers: header
          },
            function (err, response, body) {
              if (err) {
                console.error('unable to post request to send verification email', err);
              } else {
                if (body.error) {
                  console.log("unable to send email verification with error", body.error);
                } else {
                  console.log("sent verification email! server responded with", body);
                }
              }
              return;
            }
          );
        }
      }
    );
  });
}


exports.updateUser = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    // validate user's rights on seeinig the users list
    admin.database().ref('/users/' + request.body.loggedInUserId).once('value')
      .then(dbUser => {
        if (!dbUser || dbUser.role === 'REGULAR') {
          response.status(400).send({ text: 'You are not permitted to do this action.', error: { dbUser }});
          return 'You are not permitted to do this action.';
        }

        admin.auth().updateUser(request.body.uid, request.body.userUpdates)
          .then(resp => {
            response.status(200).send(resp);
            return resp;
          })
          .catch(error => {
            response.status(500).send({ text: 'Updating user has failed.', error: error });
          });

        return {text: 'it reached this far'};
      })
      .catch(error => {
        response.status(500).send({ text: 'The provided uid does not exist', error: error });
      })
  });
});

exports.deleteUser = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    // validate user's rights on seeinig the users list
    admin.database().ref('/users/' + request.body.loggedInUserId).once('value')
      .then(dbUser => {
        if (!dbUser || dbUser.role === 'REGULAR') {
          response.status(500).send({ text: 'You are not permitted to do this action.', error: { dbUser }});
          return 'You are not permitted to do this action.';
        }

        admin.auth().deleteUser(request.body.uid)
          .then(resp => {
            response.status(200).send(resp);
            return resp;
          })
          .catch(error => {
            response.status(500).send({ text: 'Deleting user has failed.', error: error });
          });

        return {text: 'it reached this far'};
      })
      .catch(error => {
        response.status(500).send({ text: 'The provided uid does not exist', error: error });
      })
  });
});