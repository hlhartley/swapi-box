import React from 'react';
import ReactDOM from 'react-dom';
import App from './Card';

it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Card />, div);
    ReactDOM.unmountComponentAtNode(div);
});