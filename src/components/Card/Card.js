import React from 'react';
import '../../main.scss';

const Card = (props) => {
    const renderCards = () => {
        if(props.selected === 'people' || (props.selected === 'favorites' && props.property.type === 'person')) {
            return (
                <div className='card-div'>
                <h1 className='card-title'>{props.property.name}
                <button 
                    onClick={() => props.clickFavoriteButton(props.property)}
                >
                    <i className="far fa-star"></i>
                </button>
                </h1>
                <i className="fas fa-male" style={{fontSize: '45px' }}></i>
                <br />
                <p className='card-body'>
                Homeworld: {props.property.homeworld}<br />
                Population: {props.property.population}<br />
                Species: {props.property.species}<br />
                Language: {props.property.language}
            </p>
            </div>
            )
        }
        if(props.selected === 'planets' || (props.selected === 'favorites' && props.property.type === 'planet')) {
            return (
                <div className='card-div'>
                <h1 className='card-title'>{props.property.name}
                <button 
                    onClick={() => props.clickFavoriteButton(props.property)}
                >
                    <i className="far fa-star"></i>
                </button>
                </h1> 
                <i className="fas fa-globe" style={{fontSize: '45px' }}></i>
                <br />
                <p className='card-body'>
                Terrain: {props.property.terrain}<br />
                Population: {props.property.population}<br />
                Climate: {props.property.climate}<br />
                Residents: {props.property.residents.map((resident) => { return (' ' + resident + ',') })}
            </p>
            </div>
            )
        }
        if(props.selected === 'vehicles' || (props.selected === 'favorites' && props.property.type === 'vehicle')) {
            return (
                <div className='card-div'>
                <h1 className='card-title'>{props.property.name}
                <button 
                    onClick={() => props.clickFavoriteButton(props.property)}
                >
                    <i className="far fa-star"></i>
                </button>
                </h1>
                <i className="fas fa-fighter-jet" style={{fontSize: '45px' }}></i>
                <br />
                <p className='card-body'>
                Model: {props.property.model}<br />
                Class: {props.property.vehicle_class}<br />
                Number of Passengers: {props.property.passengers}
            </p>
            </div>
            )
        }
    }

    return (
        <div className='card'>
            {renderCards()}
        </div>
    )
}

export default Card;