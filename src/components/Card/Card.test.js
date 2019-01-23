import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import { shallow } from 'enzyme';

let wrapper;
describe('Card', () => {

beforeEach(() => {
    wrapper = shallow(<Card/>); 
})

    it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Card />, div);
    ReactDOM.unmountComponentAtNode(div);
    })

    it('should exist', () => {   
    expect(wrapper).toBeDefined()
    })

    it('should match the snapshot with all data passed in correctly', () => {
    expect(wrapper).toMatchSnapshot();
    })
})

