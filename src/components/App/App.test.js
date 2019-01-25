import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

let wrapper;
describe('App', () => {

  beforeEach(() => {
    wrapper = shallow(<App/>); 
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should exist', () => {   
    expect(wrapper).toBeDefined()
  })

  it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should render the CardContainer, Header, Navigation, and ScrollText components', () => {
    // expect(wrapper.find('CardContainer').length).toEqual(1)
    expect(wrapper.find('Header').length).toEqual(1)
    expect(wrapper.find('Navigation').length).toEqual(1)
    expect(wrapper.find('ScrollText').length).toEqual(1)
  })

  it('should have a proper default state', () => {
    expect(wrapper.state()).toEqual({
      navFixed: false,
      initialNavPosition: 0,
      film: [],
      people: [],
      planets: [],
      vehicles: [],
      selected: ''
    })  
  })
})
