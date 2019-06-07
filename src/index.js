import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Root from './containers/Root';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';
import { Provider } from 'react-redux';
import { store } from './state-management/store';

const firebaseConfig = {
  apiKey: "AIzaSyD75XpESSE_xlos2lw_CPdQj_KtyvigIUM",
  authDomain: "stayhealthy-94800.firebaseapp.com",
  databaseURL: "https://stayhealthy-94800.firebaseio.com",
  projectId: "stayhealthy-94800",
  storageBucket: "stayhealthy-94800.appspot.com",
  messagingSenderId: "477203779511",
  appId: "1:477203779511:web:42813d9b4d070ef0"
};
firebase.initializeApp(firebaseConfig);



ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
