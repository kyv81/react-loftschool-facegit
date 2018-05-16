import React from 'react';
import { shallow } from 'enzyme';
import { Follower } from './Follower';

describe('Компонент Follower', () => {
  const login = 'Test';
  const avatar_url = 'http://placehold.it';
  const wrapper = shallow(<Follower follower={{ avatar_url, login }} />);

  it('наличие аватара', () => {
    expect(wrapper.find('img').prop('src')).toEqual(avatar_url);
  });

  it('наличие login пользователя, переданного через props', () => {
    expect(wrapper.find('h3').text()).toEqual(login);
  });

  it('Ссылка с логина пользователя ведет на /user/{user.login}', () => {
    expect(wrapper.find('Link').prop('to')).toEqual(`/user/${login}`);
  });
});
