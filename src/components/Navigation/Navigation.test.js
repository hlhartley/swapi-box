import React from 'react';
import ReactDOM from 'react-dom';
import App from './Navigation';

it.skip('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Navigation />, div);
    ReactDOM.unmountComponentAtNode(div);
});
