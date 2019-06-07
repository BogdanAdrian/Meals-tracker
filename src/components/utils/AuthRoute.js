import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import "firebase/auth";
import PropTypes from 'prop-types';

function AuthRoute({ isAuthenticated, location, ...props }) {
  return isAuthenticated ? (
    window.location.href.indexOf('finishSignUp') > 0 ?
      <Redirect to={'/finishSignUp?link=' + window.location.href}/> :
      <Route {...props}/>
  ) : (
    <Redirect to={{
      pathname: '/login',
      state: {
        referrer: location.pathname + location.search
      }
    }}
    />
  );
}

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object
};
export default withRouter(AuthRoute);