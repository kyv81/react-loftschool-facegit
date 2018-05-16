import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Follower.css';

export class Follower extends Component {
  render() {
    const { follower } = this.props;

    return (
      follower && (
        <div className="follower">
          <div className="follower-avatar">
            <img className="follower-img" src={follower.avatar_url} alt={follower.login} />
          </div>
          <div className="follower-info">
            <Link to={`/user/${follower.login}`}>
              <h3>{follower.login}</h3>
            </Link>
          </div>
        </div>
      )
    );
  }
}

export default Follower;
