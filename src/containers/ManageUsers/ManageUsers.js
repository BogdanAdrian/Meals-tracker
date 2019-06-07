import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { openModal } from '../../state-management/app/actions';
import { modalNames } from '../Modal/constants';
import {
  getUsers,
  sendEmailInvitation
} from '../../state-management/users/asyncActions';
import { deleteUserFull } from '../../state-management/users/composedAsyncActions';
import { List } from 'antd';
import Toolbar from '../../components/Toolbar';
import './ManageUsers.scss';
import { USER_ROLES } from '../../enums';

class ManageUsers extends React.Component {
  static propTypes = {
    users: PropTypes.array,
    user: PropTypes.object,
    dbUser: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    sendEmailInvitation: PropTypes.func.isRequired,
    deleteUserFull: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedUser: null
    };

    if (this.isUserAllowedHere()) {
      this.props.getUsers(props.user.uid);
    }

    this.handleAdd = this.handleAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getItemClickHandler = this.getItemClickHandler.bind(this);
    this.getRenderItem = this.getRenderItem.bind(this);
    this.handleEmailInvite = this.handleEmailInvite.bind(this);
  }

  isUserAllowedHere() {
    const { dbUser: { role } } = this.props;
    return role === USER_ROLES.ADMIN || role === USER_ROLES.USER_MANAGER;
  }

  handleAdd() {
    this.props.openModal(modalNames.USER, { user: {} });
  }
  handleRemove() {
    this.props.deleteUserFull(this.state.selectedUser.uid);
  }
  handleEdit() {
    this.props.openModal(modalNames.USER, { user: this.state.selectedUser });
  }

  getItemClickHandler(user) {
    return () => {
      if (this.state.selectedUser === user) {
        // unselect
        this.setState({ selectedUser: null });
      } else {
        // select
        this.setState({ selectedUser: user });
      }
    };
  }

  getRenderItem(user) {
    return (
      <List.Item>
        <div
          onClick={this.getItemClickHandler(user)}
          className={[
            user === this.state.selectedUser ? 'selected' : '',
            this.props.dbUser.role !== USER_ROLES.ADMIN &&
            user.role === USER_ROLES.ADMIN
              ? 'disabled'
              : ''
          ].join(' ')}
        >
          <span className='user-photo-wrapper'>
            <img src={user.photoURL} alt='user' />
          </span>
          <span>{user.displayName}</span>
          <span>{user.email}</span>
          <span>{user.uid}</span>
          <span>{user.role}</span>
          <span>{user.settings}</span>
        </div>
      </List.Item>
    );
  }

  getHeader() {
    return (
      <div className='header'>
        <span>Who</span>
        <span>Name</span>
        <span>Email</span>
        <span>Id</span>
        <span>Role</span>
        <span>Settings</span>
      </div>
    );
  }

  handleEmailInvite(email) {
    this.props.sendEmailInvitation(email);
  }

  render() {
    if (!this.isUserAllowedHere()) {
      return <Redirect to={'/manageMeals'}/>;
    }
    return (
      <div className='manage-users'>
        <Toolbar
          onAdd={this.handleAdd}
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
          onEmailInvite={this.props.dbUser.role === USER_ROLES.ADMIN ? this.handleEmailInvite : null}
        />
        <ul className='users-list'>
          <List
            size='small'
            bordered
            header={this.getHeader()}
            dataSource={this.props.users}
            renderItem={this.getRenderItem}
          />
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ app: { user, dbUser }, users: { users } }) {
  return {
    users,
    user,
    dbUser
  };
}
const mapDispatchToProps = {
  openModal,
  getUsers,
  sendEmailInvitation,
  deleteUserFull
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUsers);
