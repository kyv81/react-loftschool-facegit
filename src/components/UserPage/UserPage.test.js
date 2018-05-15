import React from 'react';
import { shallow } from 'enzyme';
import { UserPage } from './UserPage';
import Spinner from 'react-svg-spinner';

describe('Компонент UserPage', () => {
  it('наличие метода componentDidMount', () => {
    const wrapper = shallow(<UserPage />);
    expect(wrapper.instance().componentDidMount).toBeDefined();
  });

  it('наличие метода componentDidUpdate', () => {
    const wrapper = shallow(<UserPage />);
    expect(wrapper.instance().componentDidUpdate).toBeDefined();
  });

  it('наличие спинера/лоадера если props.isFetching === true', () => {
    const wrapper = shallow(<UserPage isFetching={true} />);
    const spinner = wrapper.find(Spinner);
    expect(spinner).toHaveLength(1);
  });

  it('наличие сообщения если isFetching === false && user == null', () => {
    const wrapper = shallow(<UserPage isFetching={false} user={null} />);
    const error = wrapper.find('.error');
    expect(error).toHaveLength(1);
  });

  describe('Основная верстка', () => {
    const wrapper = shallow(
      <UserPage
        user={{
          avatar_url: 'http://placehold.it',
          followers: '1',
          login: 'kyv81',
        }}
      />,
    );

    it('наличие аватара пользователя', () => {
      const avatar = wrapper.find('img').prop('src');
      expect(avatar).toEqual(wrapper.instance().props.user.avatar_url);
    });

    it('наличие login пользователя', () => {
      const login = wrapper.find('h3').text();
      expect(login).toEqual(wrapper.instance().props.user.login);
    });

    it('количество фаловеров пользователя', () => {
      const followers = wrapper.find('.user-followers').text();
      expect(followers).toEqual(wrapper.instance().props.user.followers);
    });
  });
});
