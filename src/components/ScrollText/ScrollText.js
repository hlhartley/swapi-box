import React from 'react';
import '../../main.scss';

const ScrollText = (props) => {
    return (
        <div className='scroll-text-container'>
        <div class="fade"></div>
        <section class="star-wars">
        <div class="crawl">
            <div class="title">
            <p>Episode IV</p>
            <h1>{props.film.title}</h1>
            </div>
            <p className='scroll-text'>{props.film.scrollText}</p>
        </div>
        </section>
        </div>
    )
}

export default ScrollText;