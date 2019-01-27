import React, { Component } from 'react';
import '../../main.scss';

class Card extends Component {
    constructor() {
        super()
    }

    renderCards = () => {
        if(this.props.selected === 'people' || (this.props.selected === 'favorites' && this.props.property.type === 'person')) {
            return (
                <div className='card-div'>
                <h1 className='card-title'>{this.props.property.name}
                <button 
                    onClick={() => this.props.clickFavoriteButton(this.props.property)}
                >
                    <i className="far fa-star"></i>
                </button>
                </h1>
                <i className="fas fa-male" style={{fontSize: '45px' }}></i>
                <br />
                <p className='card-body'>
                Homeworld: {this.props.property.homeworld}<br />
                Population: {this.props.property.population}<br />
                Species: {this.props.property.species}<br />
                Language: {this.props.property.language}
            </p>
            </div>
            )
        }
        if(this.props.selected === 'planets' || (this.props.selected === 'favorites' && this.props.property.type === 'planet')) {
            return (
                <div className='card-div'>
                <h1 className='card-title'>{this.props.property.name}
                <button 
                    onClick={() => this.props.clickFavoriteButton(this.props.property)}
                >
                    <i className="far fa-star"></i>
                </button>
                </h1> 
                <i className="fas fa-globe" style={{fontSize: '45px' }}></i>
                <br />
                <p className='card-body'>
                Terrain: {this.props.property.terrain}<br />
                Population: {this.props.property.population}<br />
                Climate: {this.props.property.climate}<br />
                Residents: {this.props.property.residents.map((resident, index) => { return (index+1 + '.' + ' ' + resident + ' ') })}
            </p>
            </div>
            )
        }
        if(this.props.selected === 'vehicles' || (this.props.selected === 'favorites' && this.props.property.type === 'vehicle')) {
            return (
                <div className='card-div'>
                <h1 className='card-title'>{this.props.property.name}
                <button 
                    onClick={() => this.props.clickFavoriteButton(this.props.property)}
                >
                    <i className="far fa-star"></i>
                </button>
                </h1>
                <i className="fas fa-fighter-jet" style={{fontSize: '45px' }}></i>
                <br />
                <p className='card-body'>
                Model: {this.props.property.model}<br />
                Class: {this.props.property.vehicle_class}<br />
                Number of Passengers: {this.props.property.passengers}
            </p>
            </div>
            )
        }
    }

    render() {

        return (
            <div className='card'>
                {this.renderCards()}
            </div>
        )
    }
}

export default Card;