import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import RANDR from '../../src/components/Rating/RR.jsx';

describe('<RANDR />', () => {
  it('should render a div', () => {
    const wrapper = shallow(<RANDR />);
    expect(wrapper.find('#data')).not.toBeUndefined();
  });
});