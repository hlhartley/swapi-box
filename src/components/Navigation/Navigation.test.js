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
      navFixed={false}
      initialNavPosition={0}
      people={[]}
      planets={[]}
      vehicles={[]}
      receiveSelected={() => {}}
      favorites={[]}
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

    it('should have a proper default state', () => {
      expect(wrapper.state()).toEqual({
        people: false,
        planets: false,
        vehicles: false,
        favorites: false
      })  
    })
    
    it('passSelected method should call receivedSelected method from App', () => {
    const mockEvent = mockEventFactory('people');
    wrapper.instance().passSelected(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1)
    })

    it('changeButtonStatus method should reset state back to default and then setState according to buttonType', () => {
      const buttonType = 'people';
      expect(wrapper.state()).toEqual({people: false,
        planets: false,
        vehicles: false,
        favorites: false})
      wrapper.instance().changeButtonStatus(buttonType);
      expect(wrapper.state()).toEqual({people: true,
        planets: false,
        vehicles: false,
        favorites: false})
      })
})
