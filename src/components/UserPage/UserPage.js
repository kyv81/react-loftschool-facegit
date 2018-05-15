import React, { Component } from 'react';
import Spinner from 'react-svg-spinner';
import Followers from 'components/Followers';
import { connect } from 'react-redux';
import { fetchUserRequest, fetchTokenRequest, getData, getIsFetching } from 'ducks/users';
import './UserPage.css';

export class UserPage extends Component {
  componentDidMount() {
    if (this.props.match) {
      const { fetchUserRequest, fetchTokenRequest } = this.props;
      const name = this.props.match.params.name;

      if (name) {
        fetchUserRequest(name);
      } else {
        fetchTokenRequest();
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {
      fetchUserRequest,
      match: {
        params: { name: prevName },
      },
    } = prevProps;
    const name = this.props.match.params.name;

    if (name !== prevName) {
      fetchUserRequest(name);
    }
  }

  renderContent = () => {
    const { user } = this.props;

    return (
      user && (
        <div className="user">
          <div className="user-desc">
            <div className="user-avatar">
              <img className="user-img" src={user.avatar_url} alt="avatar" />
            </div>
            <div className="user-info">
              <h3>{user.login}</h3>
              <p>
                Followers: <span className="user-followers">{user.followers}</span>
              </p>
              <p>
                Public repos: <span className="user-repos">{user.public_repos}</span>
              </p>
            </div>
          </div>
          <Followers login={user.login} />
        </div>
      )
    );
  };

  renderError = () => {
    return <p className="error">Пользователь не найден</p>;
  };

  render() {
    const { user, isFetching } = this.props;

    if (isFetching) {
      return (
        <div className="spinner">
          <Spinner size="64px" color="fuchsia" gap={5} />
        </div>
      );
    }

    if (!isFetching && user === null) return this.renderError();

    return this.renderContent();
  }
}

const mapStateToProps = state => ({
  user: getData(state),
  isFetching: getIsFetching(state),
});

const mapDispatchToProps = {
  fetchUserRequest,
  fetchTokenRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
