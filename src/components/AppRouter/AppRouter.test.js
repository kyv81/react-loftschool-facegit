import React from 'react';
import { shallow } from 'enzyme';
import { AppRouter } from './AppRouter';
import PrivateRoute from 'components/PrivateRoute';

describe('Компонент AppRouter', () => {
  const wrapper = shallow(<AppRouter />);
  const routes = ['/user/me', '/user/:name'];

  it('наличие компонента Switch', () => {
    expect(wrapper.find('Switch')).toHaveLength(1);
  });

  routes.forEach(elem => {
    it(`наличие компонента PrivateRoute path=${elem}`, () => {
      const findPrivate = wrapper.findWhere(
        el => el.type() === PrivateRoute && el.prop('path') === `${elem}`,
      );
      expect(findPrivate).toHaveLength(1);
    });
  });

  it('наличие компонента Route path="/login"', () => {
    expect(wrapper.find('Route').prop('path')).toEqual('/login');
  });
});
