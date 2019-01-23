import React from 'react';
import ReactDOM from 'react-dom';
import ScrollText from './ScrollText';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ScrollText/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
