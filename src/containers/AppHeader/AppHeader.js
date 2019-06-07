import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Popover } from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { USER_ROLES } from '../../enums';
import logo from '../../assets/logo-no-text.svg';
import { WELCOME, LOGOUT, PROFILE, STAY_HEALTHY } from './constants';
import { logout } from '../../state-management/login/asyncActions';
import { getUsers } from '../../state-management/users/asyncActions';
import { getAllMeals } from '../../state-management/meals/asyncActions';

import './AppHeader.scss';
import 'antd/dist/antd.css';

class AppHeader extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dbUser: PropTypes.object.isRequired,
    userUpdated: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      popoverVisible: false
    };

    this.setPopoverVisibility = this.setPopoverVisibility.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  handleProfileClick() {
    this.setPopoverVisibility(false);
    this.props.history.push('/updateProfile');
  }

  handleLogoClick() {
    this.props.history.push('/manageMeals');
  }

  renderTooltipContent() {
    const { user, logout } = this.props;

    return (
      <ul className='options'>
        <li className='user-details' title={user.displayName}>
          <span className='name'>{user.displayName}</span>
          <span>{user.email}</span>
        </li>
        <li onClick={this.handleProfileClick}>{PROFILE}</li>
        <li onClick={logout}>{LOGOUT}</li>
      </ul>
    );
  }

  setPopoverVisibility(newVisibility) {
    this.setState({ popoverVisible: newVisibility });
  }

  togglePopover() {
    this.setPopoverVisibility(!this.state.popoverVisible);
  }

  render() {
    return (
      <section className='app-header'>
        <div onClick={this.handleLogoClick} className='logo-wrapper'>
          <img alt='logo' src={logo} />
          <span className='brand'>{STAY_HEALTHY}</span>
        </div>
        <div className='navigation'>
          <Link to='/manageMeals'>Manage meals</Link>
          { this.props.dbUser.role === USER_ROLES.USER_MANAGER && (
            <Link to='/manageUsers'>Manage users</Link>
          )}
          {
            this.props.dbUser.role === USER_ROLES.ADMIN && (
              <React.Fragment>
                <Link to='/manageUsers'>Manage users</Link>
                <Link to='/manageAllMeals'>Manage all meals</Link>
              </React.Fragment>
            )
          }
        </div>
        <div className='right-button-wrapper'>
          <div className='greetings-text'>
            <span>{WELCOME}</span>
            <span>{this.props.user.displayName}</span>
          </div>
          <Popover
            overlayClassName='profile-popover'
            content={this.renderTooltipContent()}
            trigger='click'
            placement='bottomRight'
            visible={this.state.popoverVisible}
            onVisibleChange={this.setPopoverVisibility}
          >
            <img
              alt='profile'
              className='profile-pic'
              onClick={this.togglePopover}
              src={this.props.user.photoURL}
            />
          </Popover>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ app: { user, userUpdated, dbUser } }) {
  return {
    user,
    dbUser,
    userUpdated
  };
}
const mapDispatchToProps = {
  logout,
  getUsers,
  getAllMeals
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppHeader)
);
