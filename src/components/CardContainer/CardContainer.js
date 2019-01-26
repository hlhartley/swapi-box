import React from 'react';
import '../../main.scss';
import Card from '../Card/Card';

const CardContainer = (props) => {
    return (
        <div className="card-container">
            {props.category.map((property) => {
                return (<Card  property={property} selected={props.selected} clickFavoriteButton={props.clickFavoriteButton}/>)
            })}
        </div>
    )
}

export default CardContainer;