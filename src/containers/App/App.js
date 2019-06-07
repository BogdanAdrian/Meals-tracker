import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout, refreshToken } from '../../state-management/login/asyncActions';
import EmailValidation from '../EmailValidation';
import AuthRoute from '../../components/utils/AuthRoute';
import UpdateProfile from '../UpdateProfile';
import Modal from '../Modal';
import ManageMeals from '../ManageMeals';
import ManageAllMeals from '../ManageAllMeals';
import FinishSignUp from '../FinishSignUp';
import ManageUsers from '../ManageUsers';
import AppHeader from '../AppHeader';
import './App.scss';

const appRoutes = [{
  path: '/updateProfile',
  component: UpdateProfile
}, {
  path: '/manageMeals',
  component: ManageMeals
}, {
  path: '/manageAllMeals',
  component: ManageAllMeals
}, {
  path: '/manageUsers',
  component: ManageUsers
}, {
  path: '/finishSignUp',
  component: FinishSignUp
}];

class App extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    isSocialMediaLogin: PropTypes.bool,
    refreshToken: PropTypes.func.isRequired
  };

  renderApp() {
    return (
      <React.Fragment>
        <AppHeader/>
        <Modal/>
        <Switch>
          {appRoutes.map((route, index) => (
            <AuthRoute
              key={index}
              isAuthenticated={!!this.props.user}
              {...route}
            />
          ))}
        </Switch>
      </React.Fragment>
    );
  }

  isEmailVerified() {
    return this.props.user && (this.props.user.emailVerified || !this.props.user.emailVerified && this.props.isSocialMediaLogin);
  }

  requiresProfileUpdate() {
    return !this.props.user.email || !this.props.user.displayName;
  }

  render() {
    return (
      <div className="app">
      {
        this.isEmailVerified() ?
          this.requiresProfileUpdate() ?
            <UpdateProfile/> :
            this.renderApp()
          :
          <EmailValidation/>
      }
    </div>
   );
  }
}

function mapStateToProps({ app: { user, userUpdated }, login: { isSocialMediaLogin } }) {
  return {
    user,
    isSocialMediaLogin,
    userUpdated
  };
}
const mapDispatchToProps = {
  logout,
  refreshToken
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
