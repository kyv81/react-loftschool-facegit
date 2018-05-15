import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import UserPage from 'components/UserPage';
import Login from 'components/Login';
import { connect } from 'react-redux';
import { getIsAuthorized, logout } from 'ducks/auth';
import { getNetworkError } from 'ducks/network';
import './AppRouter.css';

export class AppRouter extends Component {
  handleClick = () => {
    const { logout } = this.props;

    logout();
  };

  render() {
    const { isAuthorized, networkError } = this.props;

    return (
      <div className="main">
        {networkError && (
          <p className="error">
            {networkError.response.status} {networkError.response.data.message}
          </p>
        )}
        {isAuthorized && (
          <div className="logout">
            <button onClick={this.handleClick}>Logout</button>
          </div>
        )}
        <Switch>
          <PrivateRoute path="/user/me" exact component={UserPage} />
          <PrivateRoute path="/user/:name" component={UserPage} />
          <Route path="/login" exact component={Login} />
          <Redirect to="/user/me" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  networkError: getNetworkError(state),
});

const mapDispatchToProps = {
  logout,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppRouter));
