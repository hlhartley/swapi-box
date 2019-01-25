import React, { Component } from 'react';
import '../../main.scss';

class Card extends Component {
    constructor() {
        super()
    }
    renderCards = () => {
        if(this.props.selected === 'people') {
            return <p className='card-body'>Homeworld: {this.props.property.homeworld}<br />
                Population: {this.props.property.population}<br />
                Species: {this.props.property.species}<br />
                Language: {this.props.property.language}</p>
        }
        if(this.props.selected === 'planets') {
            return <p className='card-body'>
                Terrain: {this.props.property.terrain}<br />
                Population: {this.props.property.population}<br />
                Climate: {this.props.property.climate}<br />
                Residents: {this.props.property.residents.map((resident, index) => { return (index+1 + '.' + ' ' + resident + ' ') })}</p>
        }
        if(this.props.selected === 'vehicles') {
            return <p className='card-body'>Model: {this.props.property.model}<br />Class: {this.props.property.vehicle_class}<br />Number of Passengers: {this.props.property.passengers}</p>
    }
}

    render() {
        console.log('property', this.props.property)
        console.log('selected', this.props.selected)
        return (
            <div className='card'>
                <h1 className='card-title'>{this.props.property.name}<i className="far fa-star"></i></h1>
                {this.renderCards()}
            </div>
        )
    }
}

export default Card;