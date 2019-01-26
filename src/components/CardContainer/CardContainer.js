import React from 'react';
import '../../main.scss';
import Card from '../Card/Card';
import { v4 } from 'uuid';

const CardContainer = (props) => {
    return (
        <div className="card-container">
            {props.category.map((property) => {
                return (<Card key={{property} + Date.now()} property={property} selected={props.selected} clickFavoriteButton={props.clickFavoriteButton}/>)
            })}
        </div>
    )
}

export default CardContainer;