import React from 'react';
import ReactDOM from 'react-dom';
import CardContainer from './CardContainer';
import { shallow } from 'enzyme';

let wrapper;
describe('CardContainer', () => {

  const cards = [{ 
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
  }]

  beforeEach(() => {
    wrapper = shallow(<CardContainer
      category={cards} 
      selected={'people'} 
      clickFavoriteButton={() => {}}
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

    it('should render the Card component', () => {
      expect(wrapper.find('Card').length).toEqual(1)
    })
  })
