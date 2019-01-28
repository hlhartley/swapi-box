import React from 'react';
import '../../main.scss';
import Card from '../Card/Card';
import PropTypes from 'prop-types';

const CardContainer = (props) => {
    return (
        <div className="card-container">
            {props.category.map((property) => {
                return (<Card 
                    key={property.name} 
                    property={property} 
                    selected={props.selected} 
                    clickFavoriteButton={props.clickFavoriteButton}
                    favoritedCards={props.favoritedCards}
                    favorites={props.favorites}
                />)
            })}
        </div>
    )
}

CardContainer.propTypes = {
    category: PropTypes.array,
    selected: PropTypes.string,
    clickFavoriteButton: PropTypes.func
}

export default CardContainer;