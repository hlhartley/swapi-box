import React from 'react';
import ReactDOM from 'react-dom';
import ScrollText from './ScrollText';
import { shallow } from 'enzyme';

let wrapper;
describe('ScrollText', () => {

  const film = { 
    episode: 4,
    scrollText: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secre…",
    title: "A New Hope"
  }

  beforeEach(() => {
    wrapper = shallow(<ScrollText film={film}/>); 
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
})
