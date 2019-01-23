import React from 'react';
import ReactDOM from 'react-dom';
import ScrollText from './ScrollText';
import { shallow } from 'enzyme';

let wrapper;
describe('ScrollText', () => {

  beforeEach(() => {
    wrapper = shallow(<ScrollText/>); 
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ScrollText/>, div);
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
