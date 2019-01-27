import React, { Component } from 'react';
import '../../main.scss';

class Navigation extends Component {
    constructor() {
        super();
    }

    passSelected = (e) => {
        e.preventDefault();
        this.props.receiveSelected(e.target.name)
    }

    render() {
    return (
        <div className={ this.props.navFixed ? "navigation-container fixed-nav" : "navigation-container" }>
            <div className='logo'>SWAPI-BOX</div>
            <a className='people-link' href='www.google.com' name='people' onClick={this.passSelected.bind(this)}><i className="fas fa-male"></i> PEOPLE [{this.props.people.length}]</a>
            <a className='planets-link' href='www.google.com' name='planets' onClick={this.passSelected.bind(this)}><i className="fas fa-globe"></i> PLANETS [{this.props.planets.length}]</a>
            <a className='vehicles-link' href='www.google.com' name='vehicles' onClick={this.passSelected.bind(this)}><i className="fas fa-fighter-jet"></i> VEHICLES [{this.props.vehicles.length}]</a>
            <a className='favorites-link' href='www.google.com' name='favorites' onClick={this.passSelected.bind(this)}><i className="far fa-star"></i> FAVORITES [{this.props.favorites.length}]</a>
        </div>
    )
}
}

export default Navigation;