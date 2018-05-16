import React, { Component } from 'react';
import Follower from 'components/Follower';
import Spinner from 'react-svg-spinner';
import { connect } from 'react-redux';
import { fetchFollowersRequest, getIds, getIsFetching } from 'ducks/followers';
import './Followers.css';

export class Followers extends Component {
  componentDidMount() {
    const { fetchFollowersRequest, login } = this.props;

    if (fetchFollowersRequest) {
      fetchFollowersRequest(login);
    }
  }

  render() {
    const { followers, isFetching } = this.props;

    if (isFetching) {
      return (
        <div className="spinner">
          <Spinner size="64px" color="fuchsia" gap={5} />
        </div>
      );
    }

    return (
      followers && (
        <div className="followers">
          {followers.map(follower => <Follower key={follower.id} follower={follower} />)}
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  followers: getIds(state),
  isFetching: getIsFetching(state),
});

const mapDispatchToProps = {
  fetchFollowersRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
