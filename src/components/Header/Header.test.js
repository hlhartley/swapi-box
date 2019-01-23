import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import { shallow } from 'enzyme';

let wrapper;
describe('Header', () => {

  beforeEach(() => {
    wrapper = shallow(<Header/>); 
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
})

  it('should exist', () => {   
    expect(wrapper).toBeDefined()
  })

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  // it.skip('should have a proper default state', () => {
  //   expect(wrapper.state()).toEqual({
      
  //   })
  })
