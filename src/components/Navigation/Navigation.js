import React, { Component } from 'react';
import '../../main.scss';
import PropTypes from 'prop-types';

class Navigation extends Component {
    constructor() {
        super();
        this.state = {
            people: false,
            planets: false,
            vehicles: false,
            favorites: false
        };
    }

    passSelected = (e) => {
        e.preventDefault();
        this.props.receiveSelected(e.target.name)
        this.changeButtonStatus(e.target.name)
    }

    changeButtonStatus = (buttonType) => {
        this.setState({
            people: false,
            planets: false,
            vehicles: false,
            favorites: false
        })
        this.setState({[buttonType]: !this.state[buttonType]})
    }
    render () {
        return (
            <div className={ this.props.navFixed ? "navigation-container fixed-nav" : "navigation-container" }>
                <div className='logo'>SWAPI-BOX</div>
                <a className={ this.state.people ? 'people-link active-button' : 'people-link' } href='google.com' name='people' onClick={this.passSelected.bind(this)}><i className="fas fa-male"></i> PEOPLE</a>
                <a className={ this.state.planets ? 'planets-link active-button' : 'planets-link' } href='google.com' name='planets' onClick={this.passSelected.bind(this)}><i className="fas fa-globe"></i> PLANETS</a>
                <a className={ this.state.vehicles ? 'vehicles-link active-button' : 'vehicles-link' } href='google.com' name='vehicles' onClick={this.passSelected.bind(this)}><i className="fas fa-fighter-jet"></i> VEHICLES</a>
                <a className={ this.state.favorites ? 'favorites-link active-button' : 'favorites-link' } href='google.com' name='favorites' onClick={this.passSelected.bind(this)}><i className="far fa-star"></i> FAVORITES [{this.props.favorites.length}]</a>
            </div>
        )
    }
}

Navigation.propTypes = {
    navFixed: PropTypes.bool,
    initialNavPosition: PropTypes.number,
    people: PropTypes.array,
    planets: PropTypes.array,
    vehicles: PropTypes.array,
    receiveSelected: PropTypes.func,
    favorites: PropTypes.array,
}

export default Navigation;