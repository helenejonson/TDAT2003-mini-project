// @flow

import * as React from 'react';
import { Up } from '../src/widgets/up';
import { shallow, mount, ShallowWrapper } from 'enzyme';

describe('Button test', () => {
  const wrapper = shallow(<Up />);
  const test = wrapper.toTop;

  it('instance test', () => {
    let instance = wrapper.instance();
    expect(typeof instance).toEqual('object');
  });
  
  /*
  it('button click test', () => {
    let instance = wrapper.instance();
    const submitSpy = jest.spyOn(instance, 'toTop').mockImplementation(() => null);
    expect(submitSpy).not.toHaveBeenCalled();

    expect(submitSpy).not.toHaveBeenCalled();
    wrapper.find('button').simulate('click');
    console.log(wrapper.find('button.up').debug());
    expect(submitSpy).toHaveBeenCalled();
  });
  */

  it('renders correctly', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
