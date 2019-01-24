import React, { Component } from 'react';
import '../../main.scss';

class Card extends Component {
    constructor() {
        super()
    }
    renderCards = () => {
        if(this.props.selected === 'people') {
            return <p className='card-body'>Homeworld: {this.props.property.homeworld}<br />Population: {this.props.property.population}<br />Species: {this.props.property.species}<br />Language: {this.props.property.language}</p>
        } else if(this.props.selected === 'planets') {
            return <p className='card-body'>Terrain: {this.props.property.homeworld}<br />Population: {this.props.property.population}<br />Climate: {this.props.property.species}<br />Residents: {this.props.property.language}</p>
        } else if(this.props.selected === 'vehicles') {
            return <p className='card-body'>Model: {this.props.property.homeworld}<br />Class: {this.props.property.population}<br />Number of Passengers: {this.props.property.species}</p>
    }
}

    render() {
        return (
            <div className='card'>
                <h1 className='card-title'>{this.props.property.name}<i className="far fa-star"></i></h1>
                {this.renderCards()}
            </div>
        )
    }
}

export default Card;