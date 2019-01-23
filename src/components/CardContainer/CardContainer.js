import React from 'react';
import '../../main.scss';
import Card from '../Card/Card';

const CardContainer = (props) => {
    return (
        <div className="card-container">
            {props.people.map((person) => {
                return (<Card person={person}/>)
            })}
        </div>
    )
}

export default CardContainer;