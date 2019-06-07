import React from 'react';
import { mount } from 'enzyme';
import Toolbar from '../../../src/components/Toolbar';

describe('<Toolbar />', () => {
  const onAdd = jest.fn();
  const onRemove = jest.fn();
  const onEdit = jest.fn();
  const onEmailInvite = jest.fn();

  const props = {
    onAdd,
    onRemove,
    onEdit,
    onEmailInvite
  };

  it('should render correctly', () => {
    const toolbarWrapper = mount(<Toolbar {...props}/>);

    expect(toolbarWrapper).toMatchSnapshot();
    toolbarWrapper.unmount();
  });

  it('should call onAdd on add clicked', () => {
    const toolbarWrapper = mount(<Toolbar {...props}/>);

    toolbarWrapper.find('.toolbar-button.add').at(0).simulate('click');

    expect(onAdd).toHaveBeenCalled();
    toolbarWrapper.unmount();
  });
});

describe('Examining the syntax of Jest tests', () => {
   
  it('sums numbers', () => {
      expect(1 + 2).toEqual(3);
      expect(2 + 2).toEqual(4);
   });
});
