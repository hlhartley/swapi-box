import React from 'react';
import '../../main.scss';

const Navigation = (props) => {
    const passSelected = (e) => {
        e.preventDefault();
        props.receiveSelected(e.target.name)
    }

    return (
        <div className={ props.navFixed ? "navigation-container fixed-nav" : "navigation-container" }>
            <div className='logo'>SWAPI-BOX</div>
            <a className='people-link' href='google.com' name='people' onClick={passSelected.bind(this)}><i className="fas fa-male"></i> PEOPLE</a>
            <a className='planets-link' href='google.com' name='planets' onClick={passSelected.bind(this)}><i className="fas fa-globe"></i> PLANETS</a>
            <a className='vehicles-link' href='google.com' name='vehicles' onClick={passSelected.bind(this)}><i className="fas fa-fighter-jet"></i> VEHICLES</a>
            <a className='favorites-link' href='google.com' name='favorites' onClick={passSelected.bind(this)}><i className="far fa-star"></i> FAVORITES [{props.favorites.length}]</a>
        </div>
    )}

export default Navigation;