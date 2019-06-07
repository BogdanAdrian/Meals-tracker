import React from 'react';
import { connect } from 'react-redux';
import { finishSignUp } from '../../state-management/login/asyncActions';
import PropTypes from 'prop-types';

class FinishSignUp extends React.Component {
  static propTypes = {
    finishSignUp: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    console.log('sign up page displayed');
    this.state = {
      email: window.localStorage.getItem('emailForSignIn') || ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleFinishSignUp = this.handleFinishSignUp.bind(this);
  }

  handleEmailChange({ target: { value } }) {
    this.setState({ email: value });
  }

  handleFinishSignUp() {
    this.props.finishSignUp(this.state.email, this.props.location.query.split('?link=')[1]);
  }


  render = () => (
    <div className='finish-sign-up'>

      <input value={this.state.email} onChange={this.handleEmailChange} placeholder='email'/>
      <button onClick={this.handleFinishSignUp}>FINISH SIGN UP</button>>
    </div>
  )
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => ({
  finishSignUp
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FinishSignUp);
