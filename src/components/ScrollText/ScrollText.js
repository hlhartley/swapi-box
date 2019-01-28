import React from 'react';
import '../../main.scss';
import PropTypes from 'prop-types';

const ScrollText = (props) => {
    return (
        <div className='scroll-text-container'>
        <div className="fade"></div>
        <section className="star-wars">
        <div className="crawl">
            <div className="title">
            <p>Episode IV </p>
            <h1>{props.films.title}</h1>
            </div>
            <p className='scroll-text'>{props.films.scrollText}</p>
            <p>- released: {props.films.release}</p>
        </div>
        </section>
        </div>
    )
}

ScrollText.propTypes = {
    films: PropTypes.object,
}

export default ScrollText;