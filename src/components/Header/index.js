import React from 'react';
import './style.css';
import NetflixLogo from '../../images/netflix-logo.svg';
import UserLogo from '../../images/user-logo.png';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={NetflixLogo} alt="Netflix"/>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={UserLogo} alt="Usuário" />
                </a>
            </div>
        </header>
    )
}