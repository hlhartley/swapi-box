import React from 'react';
import '../../main.scss';

const Navigation = (props) => {
    return (
        <div className={ props.navFixed ? "navigation-container fixed-nav" : "navigation-container" }>
            <div className='logo'>SWAPI.</div>
            <a href='www.google.com'><i class="fas fa-male"></i> PEOPLE</a>
            <a href='www.google.com'><i class="fas fa-globe"></i> PLANETS</a>
            <a href='www.google.com'><i class="fas fa-fighter-jet"></i> VEHICLES</a>
            <a href='www.google.com'><i class="far fa-star"></i> FAVORITES</a>
        </div>
    )
}

export default Navigation;