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

  it('should render the Header, Navigation, and ScrollText and CardContainer components', () => {
    expect(wrapper.find('Header').length).toEqual(1)
    expect(wrapper.find('Navigation').length).toEqual(1)
    expect(wrapper.find('ScrollText').length).toEqual(1)

    wrapper.instance().renderScreen()
    wrapper.setState({selected: 'people'})
    expect(wrapper.find('CardContainer').length).toEqual(1)
  })

  it('should have a proper default state', () => {
    expect(wrapper.state()).toEqual({
      navFixed: false,
      initialNavPosition: 0,
      films: [],
      people: [],
      planets: [],
      vehicles: [],
      selected: 'films',
      favorites: [],
    })  
  })

  it('fixNav method should setState of navFixed based on window.scrollY position', () => {
    const expectedState = {
      navFixed: true,
      initialNavPosition: 0,
      films: [],
      people: [],
      planets: [],
      vehicles: [],
      selected: 'films',
      favorites: [],
    };
    
    expect(wrapper.state()).toEqual({navFixed: false,
      initialNavPosition: 0,
      films: [],
      people: [],
      planets: [],
      vehicles: [],
      selected: 'films',
      favorites: [],});
    wrapper.instance().fixNav()
    expect(wrapper.state()).toEqual(expectedState);
  })

  it('extractIdFrom method should extract the people id from the URL', () => {
    const mockUrl = 'https://swapi.co/api/people/5/'
    const peopleId = wrapper.instance().extractIdFrom(mockUrl)
    expect(peopleId).toEqual('5')

    const mockUrl2 = 'https://swapi.co/api/people/37/'
    const peopleId2 = wrapper.instance().extractIdFrom(mockUrl2)
    expect(peopleId2).toEqual('37')
  })

  it('receiveSelected method should set state of selected to selectedButton', () => {
    wrapper.instance().receiveSelected('people')
    expect(wrapper.state()).toEqual({navFixed: false,
      initialNavPosition: 0,
      films: [],
      people: [],
      planets: [],
      vehicles: [],
      selected: 'people',
      favorites: []});
  })

  it('returnCards method returns array of all objects in state of a certain category', () => {
    wrapper.setState({ 
      navFixed: false,
      initialNavPosition: 0,
      films: [],
      people: ['a', 'b', 'c'],
      planets: [1, 2, 3],
      vehicles: ['hi', 'bye'],
      selected: 'planets',
      favorites: [],
    });
    expect(wrapper.instance().returnCards()).toEqual([1, 2, 3]);

    wrapper.setState({ 
      selected: '',
    });
    expect(wrapper.instance().returnCards()).toEqual([]);

    wrapper.setState({ 
      selected: 'vehicles',
    });
    expect(wrapper.instance().returnCards()).toEqual(['hi', 'bye']);
  })

  it('renderScreen method returns different value based on this.state.selected', () => {
    wrapper.instance().renderScreen()
    expect(wrapper.find('ScrollText').length).toEqual(1)
    expect(wrapper.find('CardContainer').length).toEqual(0)

    wrapper.setState({ 
      navFixed: false,
      initialNavPosition: 0,
      films: [],
      people: [],
      planets: [],
      vehicles: [],
      selected: 'people',
      favorites: []
    });

    expect(wrapper.find('ScrollText').length).toEqual(0)
    expect(wrapper.find('CardContainer').length).toEqual(1)
  })

  it('clickFavoriteBtn method adds new object to favorites key in App state', () => {
    let mockObject = { 
      climate: "temperate", 
      created: "2014-12-10T11:35:48.479000Z",
      diameter: "12500",
      edited: "2014-12-20T20:58:18.420000Z",
      films: ["https://swapi.co/api/films/6/", "https://swapi.co/api/films/1/"],
      gravity: "1 standard",
      name: "Alderaan",
      orbital_period: "364",
      population: "2000000000",
      residents: ["https://swapi.co/api/people/5/", "https://swapi.co/api/people/68/", "https://swapi.co/api/people/81/"],
      rotation_period: "24",
      surface_water: "40",
      terrain: "grasslands, mountains",
      url: "https://swapi.co/api/planets/2/"
  }
    wrapper.instance().clickFavoriteButton(mockObject)
    expect(wrapper.state()).toEqual({navFixed: false,
      initialNavPosition: 0,
      films: [],
      people: [],
      planets: [],
      vehicles: [],
      selected: 'films',
      favorites: [mockObject]});
  })
})

// Test allFetchCalls
