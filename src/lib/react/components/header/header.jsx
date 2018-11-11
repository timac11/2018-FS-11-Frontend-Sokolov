import React from 'react'
import './header.css';

const Header = (props) => {
    return (
        <div className="header">
            <div>
                <button className="arrow-back-icon"/>
            </div>
            <div className="user-img-wrapper">
                <img className="user-img" src="../resources/img/1.png"></img>
            </div>
            <div className="user-info-wrapper">
                <span className="name-wrapper">Jenifer</span>
                <span className="user-online-info ">online 2 hours ago</span>
            </div>
            <div className="buttons-wrapper">
                <button className="filled-icon"><i></i></button>
                <button className="actions-icon"><i></i></button>
            </div>
        </div>
    )
}

export default Header;