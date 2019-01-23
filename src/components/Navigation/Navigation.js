import React from 'react';
import '../../main.scss';

const Navigation = (props) => {
    return (
        <div className={ props.navFixed ? "navigation-container fixed-nav" : "navigation-container" }>
            <div className='logo'>SWAPI-BOX</div>
            <a className='people-link' href='www.google.com'><i className="fas fa-male"></i> PEOPLE [{props.people.length}]</a>
            <a className='planets-link' href='www.google.com'><i className="fas fa-globe"></i> PLANETS</a>
            <a className='vehicles-link' href='www.google.com'><i className="fas fa-fighter-jet"></i> VEHICLES</a>
            <a className='favorites-link' href='www.google.com'><i className="far fa-star"></i> FAVORITES [0]</a>
        </div>
    )
}

export default Navigation;