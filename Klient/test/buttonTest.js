// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import {Up} from '../src/widgets';
import { shallow, mount } from 'enzyme';

describe('Button test', () => {
  const wrapper = shallow(<Up />);

  it('clicking button', () => {
    let instance = Up.instance();
    expect(typeof instance).toEqual('object');
    const toTopSpy = jest.spyOn(instance, 'toTop');
    wrapper.find('button.up').simulate('click');

    if (instance) expect(toTopSpy).toHaveBeenCalled();

  });
});