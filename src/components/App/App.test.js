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
      selected: '',
      favoritedCards: []
    })  
  })

  // it.skip('fixNav method', () => {
    
  // })

  it('extractIdFrom method should extract the people id from the URL', () => {
    const mockUrl = 'https://swapi.co/api/people/5/'
    const peopleId = wrapper.instance().extractIdFrom(mockUrl)
    expect(peopleId).toEqual('5')

    const mockUrl2 = 'https://swapi.co/api/people/37/'
    const peopleId2 = wrapper.instance().extractIdFrom(mockUrl2)
    expect(peopleId2).toEqual('37')
  })

  // it('receiveSelected method', () => {
    
  // })

  // it('returnCards method', () => {
    
  // })

  // it('renderScreen method', () => {
    
  // })

  // it('clickFavoriteBtn method', () => {
    
  // })

  // Test allFetchCalls
})


