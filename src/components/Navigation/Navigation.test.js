import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';
import { shallow } from 'enzyme';

let wrapper;

const mockEventFactory = (name) => {
  return {
    target: {
      name: name,
    },
    preventDefault: jest.fn(),
  }
}

describe('Navigation', () => {

  beforeEach(() => {
    wrapper = shallow(<Navigation
      navFixed={275}
      iitialNavPosition={0}
      people={[]}
      receiveSelected={() => {}}
      />); 
    })
    
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.unmountComponentAtNode(div);
    })
    
    
    it('should exist', () => {   
      expect(wrapper).toBeDefined()
    })
    
    it('should match the snapshot with all data passed in correctly', () => {
      expect(wrapper).toMatchSnapshot();
    })
    
    it('passSelected method should call receivedSelected method from App', () => {
    const mockEvent = mockEventFactory('people');
    wrapper.instance().passSelected(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1)
    })
})
