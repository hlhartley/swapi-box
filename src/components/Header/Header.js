import React from 'react';
import '../../main.scss';

const Header = () => {
    return (
        <div className='header'>
            <h1 className='header-text'>SWAPI<img className='light-saber' alt ='light saber' src={require('../../images/light-saber.png')} />BOX</h1>
        </div>
    )
}

export default Header;