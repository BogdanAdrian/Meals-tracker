import React from 'react';
import { connect } from 'react-redux';
import { EMAIL_VALIDATION_MESSAGE, LOG_OUT, TRY_AGAIN } from './constants';
import { logout, login, validateEmail } from '../../state-management/login/asyncActions';
import PropTypes from 'prop-types';
import './EmailValidation.scss';

class EmailValidation extends React.Component {
  static propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    validateEmail: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleResendEmailValidation = this.handleResendEmailValidation.bind(this);
  }

  handleLogin() {
    this.props.login(this.props.email, this.props.password);
  }

  handleResendEmailValidation() {
    this.props.validateEmail(this.props.user);
  }

  render () {
    return (
      <div className='email-validation'>
        <div className='message-box'>
          { EMAIL_VALIDATION_MESSAGE }
        </div>
        <div className='buttons'>
          <button className='log-out' onClick={this.props.logout}>{LOG_OUT}</button>
          <button className='try-again' onClick={this.handleLogin}>{TRY_AGAIN}</button>
        </div>
        <span className='resend-email' onClick={this.handleResendEmailValidation}>Haven't received the email yet? Click here.</span>
      </div>
    );
  }
}


function mapStateToProps({ login: { email, password }, app: { user } }) {
  return {
    email,
    password,
    user
  };
}
const mapDispatchToProps = {
  logout,
  login,
  validateEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailValidation);