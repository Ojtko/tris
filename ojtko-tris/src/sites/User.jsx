import './../styles/Home.css';
import './../styles/Login.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function User() {
    const [userId, setUserId] = useState(localStorage.getItem('userId') || "0");
    const [userNick, setUserNick] = useState(localStorage.getItem('userNick') || "gość");
    const [userExp, setUserExp] = useState(localStorage.getItem('userExp') || "0");
    const [userCredits, setUserCredits] = useState(localStorage.getItem('userCredits') || "0");

    const handleClick = () => {
        localStorage.clear();
    };

    return (
        <>
            {/* Przycisk powrotu */}
            <Link to="/">
                <button className="btn btn-outline-light">Powrót</button>
            </Link>

            <nav className="navbar animate__animated animate__fadeInDown">
                <div className="container-fluid">
                    <span className="navbar-text">#{userNick}</span>
                </div>
            </nav>

            <div className="user-info">
                <div>id: {userId}</div>
                <div>nick: {userNick}</div>
                <div>exp: {userExp}</div>
                <div>credits: {userCredits}</div>
                <Link to="/login" onClick={handleClick}>
                    <div className="btn btn-light">wyloguj</div>
                </Link>
            </div>
        </>
    );
}

export default User;
