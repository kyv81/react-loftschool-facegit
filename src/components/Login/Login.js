import React, { Component } from 'react';
import './Login.css';
import { connect } from 'react-redux';
import { authorize, getIsAuthorized } from 'ducks/auth';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    token: '',
  };

  handleChange = e => {
    this.setState({ token: e.target.value });
  };

  handleKeyDown = e => {
    const { authorize } = this.props;
    const { token } = this.state;

    if (e.keyCode === 13) {
      authorize(token);
    }
  };

  render() {
    const { isAuthorized } = this.props;
    const { token } = this.state;

    if (isAuthorized) return <Redirect to="/" />;

    return (
      <div className="login">
        <p>
          Получить токен нужно на своей странице github, перейдите по{' '}
          <a href="https://github.com/settings/tokens">адресу</a> и создать себе токен. Запишите
          куда нибудь токен, так как после создания доступ к нему будет только один раз.
        </p>
        <input
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="auth_token"
          type="text"
          value={token}
        />
        <p>После ввода нажать Enter</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
});

const mapDispatchToProps = { authorize };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
