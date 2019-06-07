import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthRoute from '../../components/utils/AuthRoute';
import { refreshToken } from '../../state-management/login/asyncActions';
import { setUnauthenticated } from '../../state-management/login/actions';
import Login from '../Login';
import App from '../App';

const ONE_MINUTE = 60 * 1000;

class Root extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    tokenExpirationTimestamp: PropTypes.number,
    refreshToken: PropTypes.func.isRequired,
    setUnauthenticated: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this._timeout = null;

    if (props.isAuthenticated && props.tokenExpirationTimestamp <= Date.now()) {
      props.setUnauthenticated(false);
    } else {
      this._setTimer();
    }
  }

  componentDidUpdate({ isAuthenticated, tokenExpirationTimestamp }) {
    if ((!isAuthenticated && isAuthenticated !== this.props.isAuthenticated) ||
      tokenExpirationTimestamp !== this.props.tokenExpirationTimestamp) {
      this._setTimer();
    }
  }

  _setTimer() {
    clearTimeout(this._timeout);

    this._timeout = setTimeout(() => {
      this.props.refreshToken();
    }, this.props.tokenExpirationTimestamp - Date.now() - ONE_MINUTE);
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  render() {
    const { isAuthenticated } = this.props;

    return (
      <HashRouter>
        <Switch>
          <Route
            path="/login"
            component={Login}
          />
          <AuthRoute
            isAuthenticated={isAuthenticated}
            path="/"
            component={App}
          />
        </Switch>
      </HashRouter>
    );
  }
}

function mapStateToProps({ login: { isAuthenticated, tokenExpirationTimestamp } }) {
  return {
    isAuthenticated,
    tokenExpirationTimestamp
  };
}

const mapDispatchToProps = {
  refreshToken,
  setUnauthenticated
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);