// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Up } from '../src/widgets';
import { shallow, mount } from 'enzyme';

describe('Button test', () => {
  const wrapper = shallow(<Up />);

  it('clicking button', () => {
    //let instance = wrapper.instance();

    const toTopSpy = jest.spyOn(wrapper.instance(), 'toTop').mockImplementation(() => null);
    wrapper.find('button').simulate('click');
    console.log(wrapper.find('button.up').debug());

    expect(toTopSpy).toHaveBeenCalled();
  });
});
