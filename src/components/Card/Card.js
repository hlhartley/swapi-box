import React, { Component } from 'react';
import '../../main.scss';

class Card extends Component {
    constructor() {
        super()
    }
    renderCards = () => {
    if(this.props.selected === 'people' || (this.props.selected === 'favorites' && this.props.property.type === 'person')) {
        return <p className='card-body'>
            Homeworld: {this.props.property.homeworld}<br />
            Population: {this.props.property.population}<br />
            Species: {this.props.property.species}<br />
            Language: {this.props.property.language}
        </p>
    }
    if(this.props.selected === 'planets' || (this.props.selected === 'favorites' && this.props.property.type === 'planet')) {
        return <p className='card-body'>
            Terrain: {this.props.property.terrain}<br />
            Population: {this.props.property.population}<br />
            Climate: {this.props.property.climate}<br />
            Residents: {this.props.property.residents.map((resident, index) => { return (index+1 + '.' + ' ' + resident + ' ') })}
        </p>
    }
    if(this.props.selected === 'vehicles' || (this.props.selected === 'favorites' && this.props.property.type === 'vehicle')) {
        return <p className='card-body'>
            Model: {this.props.property.model}<br />
            Class: {this.props.property.vehicle_class}<br />
            Number of Passengers: {this.props.property.passengers}
        </p>
    }
}

    render() {

        return (
            <div className='card'>
                <h1 className='card-title'>{this.props.property.name}
                    <button 
                        onClick={() => this.props.clickFavoriteButton(this.props.property)}
                    >
                        <i className="far fa-star"></i>
                    </button>
                </h1>
                {this.renderCards()}
            </div>
        )
    }
}

export default Card;