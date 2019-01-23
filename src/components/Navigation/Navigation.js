import React from 'react';
import '../../main.scss';

const Navigation = (props) => {
    return (
        <div className={ props.navFixed ? "navigation-container fixed-nav" : "navigation-container" }>
            <div className='logo'>SWAPI.</div>
            <a href='www.google.com'>People</a>
            <a href='www.google.com'>Planets</a>
            <a href='www.google.com'>Vehicles</a>
            <a href='www.google.com'>View Favorites</a>
        </div>
    )
}

export default Navigation;