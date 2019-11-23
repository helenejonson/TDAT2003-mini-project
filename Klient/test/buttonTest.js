// @flow

import * as React from 'react';
import { Component } from 'react-simplified';


import { AdvSearch } from '../src/search';
import { shallow, mount } from 'enzyme';

describe('Button test', () => {
  const wrapper = shallow(<AdvSearch />);

  it('clicking button', () => {
    wrapper.find('button.close').simulate('click');

    let instance = AdvSearch.instance();
    expect(typeof instance).toEqual('object');
    if (instance) expectexpect(searchArt).toBeCalled();

  });
});