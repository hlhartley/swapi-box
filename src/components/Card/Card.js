import React from 'react';
import '../../main.scss';

const Card = (props) => {
    return (
        <div className='card'>
            <h1 className='card-title'>{props.person.name}<i className="far fa-star"></i></h1>
            <p className='card-body'>Homeworld: {props.person.homeworld}<br />Population: {props.person.population}<br />Species: {props.person.species}<br />Language: {props.person.language}</p>
        </div>
    )
}

export default Card;