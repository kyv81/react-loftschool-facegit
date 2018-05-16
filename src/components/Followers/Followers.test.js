import React from 'react';
import { shallow } from 'enzyme';
import { Followers } from './Followers';
import Follower from '../Follower';
import Spinner from 'react-svg-spinner';

describe('Компонент Followers', () => {
  it('наличие метода класса componentDidMount', () => {
    const wrapper = shallow(<Followers />);
    expect(wrapper.instance().componentDidMount).toBeDefined();
  });

  it('наличие лоадера/спинера, если isFetching === true', () => {
    const wrapper = shallow(<Followers isFetching={true} />);
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });

  it('Возвращаются компоненты Followers в верном количестве', () => {
    const followers = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const wrapper = shallow(<Followers followers={followers} />);
    expect(wrapper.find(Follower)).toHaveLength(followers.length);
  });
});
