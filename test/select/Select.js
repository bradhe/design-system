import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import Select from '../../source/react/library/select/Select';

describe('<Select />', () => {
  const defaultProps = { disablePortal: true };

  it('should render without blowing up', () => {
    const wrapper = shallow(<Select { ...defaultProps } />);

    expect(wrapper.length).to.eql(1);
  });

  it('should open on Input focus', () => {
    const options = ['Cats', 'Dogs'];
    const wrapper = mount(<Select options={ options } { ...defaultProps } />);

    expect(wrapper.find('MenuItem').length).to.eql(0);

    wrapper.find('Input').simulate('focus');

    expect(wrapper.find('MenuItem').length).to.eql(options.length);
  });

  context('options are objects', () => {
    const options = [
      { value: 'Michael', label: 'Sig' },
      { value: 'Geoff', label: 'Catnasty' },
    ];

    it('should render the label', () => {
      const wrapper = mount(<Select options={ options } { ...defaultProps } />);

      wrapper.find('Input').simulate('focus');

      expect(wrapper.find('MenuList').childAt(0).text()).to.eql('Sig');
      expect(wrapper.find('MenuList').childAt(1).text()).to.eql('Catnasty');
    });

    it('should emit the full object as a callback to onSelect', () => {
      const onSelect = sinon.spy();
      const wrapper = mount(
        <Select options={ options } onSelect={ onSelect } { ...defaultProps } />,
      );

      wrapper.find('Input').simulate('focus');

      // The menu should be open now
      expect(wrapper.find('MenuItem').length).to.eql(2);

      wrapper.find('MenuItem').first().find('a').simulate('click');

      expect(onSelect.lastCall.args).to.eql([{
        id: 0,
        value: 'Michael',
        label: 'Sig',
        selected: true,
      }]);

      // Now we close the menu
      expect(wrapper.find('MenuItem').length).to.eql(0);
    });
  });

  describe('typeahead', () => {
    it('should filter as the user types in the input', () => {
      const options = ['Company', 'Computer', 'Turtles'];
      const wrapper = mount(<Select options={ options } { ...defaultProps } />);

      wrapper.find('Input').simulate('focus');

      // Should be showing all the items by default
      expect(wrapper.find('MenuItem').length).to.eql(3);

      wrapper.find('Input').simulate('change', {
        target: { value: 'Comp' },
      });

      // Only showing the matching items now
      expect(wrapper.find('MenuItem').length).to.eql(2);
    });
  });

  describe('clearable select', () => {
    it('should clear the value of the input', () => {
      const options = [{ value: 'Tea', label: 'Tea', selected: true }];
      const wrapper = mount(<Select options={ options } { ...defaultProps } clearable />);

      expect(wrapper.find('Input').prop('value')).to.eql('Tea');

      wrapper.find('.rc-select-action').first().simulate('click');

      expect(wrapper.find('Input').prop('value')).to.eql('');
    });
  });

  describe('options are strings', () => {
    const options = ['Michael Phelps', 'Ryan Lochte'];

    it('should render the strings as labels', () => {
      const wrapper = mount(<Select options={ options } { ...defaultProps } />);

      wrapper.find('Input').simulate('focus');

      expect(wrapper.find('MenuList').childAt(0).text()).to.eql('Michael Phelps');
      expect(wrapper.find('MenuList').childAt(1).text()).to.eql('Ryan Lochte');
    });

    it('should emit the option as an object as a callback to onSelect', () => {
      const onSelect = sinon.spy();
      const wrapper = mount(
        <Select options={ options } onSelect={ onSelect } { ...defaultProps } />,
      );

      wrapper.find('Input').simulate('focus');

      // The menu should be open now
      expect(wrapper.find('MenuItem').length).to.eql(2);

      wrapper.find('MenuItem').first().find('a').simulate('click');

      expect(onSelect.lastCall.args).to.eql([{
        id: 'Michael Phelps',
        value: 'Michael Phelps',
        label: 'Michael Phelps',
        selected: true,
      }]);

      // Now we close the menu
      expect(wrapper.find('MenuItem').length).to.eql(0);
    });
  });

  it('should allow the options to be marked as not selectable', () => {
    const options = [
      { value: 'Tea', label: 'Tea' },
      { value: 'new', label: 'Add new drink', selectable: false },
    ];
    const wrapper = mount(<Select options={ options } { ...defaultProps } />);

    expect(wrapper.find('Input').prop('value')).to.eql('');

    wrapper.find('Input').simulate('focus');
    wrapper.find('MenuItem').at(0).find('a').simulate('click');

    expect(wrapper.find('Input').prop('value')).to.eql('Tea');

    wrapper.find('Input').simulate('focus');
    wrapper.find('MenuItem').at(1).find('a').simulate('click');

    // This should remain the same.
    expect(wrapper.find('Input').prop('value')).to.eql('Tea');
  });
});
