import React from 'react';
import ReactDOM from 'react-dom';
import CardContainer from './CardContainer';
import { shallow } from 'enzyme';

let wrapper;
describe('CardContainer', () => {

  beforeEach(() => {
    wrapper = shallow(<CardContainer/>); 
  })

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<CardContainer />, div);
      ReactDOM.unmountComponentAtNode(div);
    })

    it('should exist', () => {   
      expect(wrapper).toBeDefined()
    })

    it('should match the snapshot with all data passed in correctly', () => {
      expect(wrapper).toMatchSnapshot();
    })

    it('should render the Card component', () => {
      expect(wrapper.find('Card').length).toEqual(1)
    })
  })
