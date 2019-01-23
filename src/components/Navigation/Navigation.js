import React from 'react';
import '../../main.scss';

const Navigation = () => {
    return (
        <div className='navigation-container'>
            <div className='logo'>SWAPI.</div>
            <a href='www.google.com'>People</a>
            <a href='www.google.com'>Planets</a>
            <a href='www.google.com'>Vehicles</a>
            <a href='www.google.com'>View Favorites</a>
        </div>
    )
}

export default Navigation;