// 3rd parties
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from  '@fortawesome/free-brands-svg-icons';
import { faGithub } from  '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// state management
import { disableAccount } from '../../state-management/login/asyncActions';
import { twitterLoginFull, githubLoginFull, fullLogin } from '../../state-management/login/composedAsyncActions';
import { signUpFull } from '../../state-management/login/composedAsyncActions';
import { clearLoginError, setEmail, setPassword } from '../../state-management/login/actions';
// components
import InputWithIcon from '../../components/InputWithIcon';
// other
import Logo from '../../assets/logo.svg';
import { LOGIN, SIGN_UP, PASSWORD, EMAIL, LOGIN_FAILURE_LIMIT } from './constants';
import './Login.scss';

library.add(faEnvelope, faLock, faTwitter, faGithub);

export class Login extends React.Component {
  static propTypes = {
    error: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    failedLogins: PropTypes.number,
    email: PropTypes.string,
    password: PropTypes.string,
    fullLogin: PropTypes.func.isRequired,
    signUpFull: PropTypes.func.isRequired,
    clearLoginError: PropTypes.func.isRequired,
    disableAccount: PropTypes.func.isRequired,
    githubLoginFull: PropTypes.func.isRequired,
    twitterLoginFull: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate({ failedLogins }) {
    if (failedLogins < this.props.failedLogins && this.props.failedLogins >= LOGIN_FAILURE_LIMIT) {
      // this should've been done from BE side
      this.props.disableAccount(this.props.email);
    }
  }

  handleLogin() {
    this.props.fullLogin(this.props.email, this.props.password);
  }

  handleSignUp() {
    this.props.signUpFull(this.props.email, this.props.password);
  }

  handleInputChange(e) {
    if (e.target.name === EMAIL) {
      this.props.setEmail(e.target.value);
    } else {
      this.props.setPassword(e.target.value);
    }
    this.props.clearLoginError();
  }
  
  renderLoginForm() {
    const emailInputProps = {
      type: EMAIL,
      name: EMAIL,
      placeholder: EMAIL,
      required: true,
      value: this.props.email,
      onChange: this.handleInputChange
    };
    const passwordInputProps = {
      type: PASSWORD,
      name: PASSWORD,
      placeholder: PASSWORD,
      required: true,
      value: this.props.password,
      onChange: this.handleInputChange
    };
    return(
			<div className="login">
				<div className="logo-wrapper">
          <img src={Logo} alt='logo'/>
        </div>
				<div className="login-form">
          <InputWithIcon inputProps={emailInputProps} icon='envelope'/>
          <InputWithIcon inputProps={passwordInputProps} icon='lock'/>
					{
						this.props.error && <div className="warning">{this.props.error.message}</div>
					}
					<button className="log-in-btn" onClick={this.handleLogin}>{LOGIN}</button>
					<span className="sign-up" onClick={this.handleSignUp}>{SIGN_UP}</span>
				</div>
        <div className='social-media-buttons'>
          <FontAwesomeIcon onClick={this.props.twitterLoginFull} className='social-media-button' icon={['fab','twitter']}/>
          <FontAwesomeIcon onClick={this.props.githubLoginFull} className='social-media-button' icon={['fab','github']}/>
        </div>
			</div>
		);
  }

  render() {
    const { referrer } = this.props.location.state || { referrer: '/manageMeals' };

    return this.props.isAuthenticated ? <Redirect to={referrer}/> : this.renderLoginForm();
  }
}

function mapStateToProps({ login: { error, isAuthenticated, failedLogins, email, password } }) {
  return {
    error,
    isAuthenticated,
    failedLogins,
    email,
    password
  };
}
const mapDispatchToProps = {
  fullLogin,
  signUpFull,
  clearLoginError,
  disableAccount,
  setEmail,
  setPassword,
  twitterLoginFull,
  githubLoginFull
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);