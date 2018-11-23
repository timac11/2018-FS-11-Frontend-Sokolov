import React from 'react'
import './header.css';

const Header = (props) => {
    const {actionButtonHidden, searchButtonHidden, avatarHidden} = props;
    return (
        <div className="header">
            <button className="arrow-back-icon" onClick={backHistory}/>
            {renderUserImage(props)}
            {renderBaseHeaderContent(props)}
            <div className="buttons-wrapper">
                <button className="filled-icon" hidden={searchButtonHidden}><i></i></button>
                <button className="actions-icon" hidden={actionButtonHidden}><i></i></button>
            </div>
        </div>
    )
}

const backHistory = () => {
    window.history.back();
}

const renderUserImage = (props) => {
    const avatarHidden = props.avatarHidden;
    return avatarHidden ? null : (
        <div className="user-img-wrapper">
            <img className="user-img" src="../resources/img/1.png"/>
        </div>
    )
}

//TODO remove hardcoded values
const renderBaseHeaderContent = (props) => {
    const content = props.content;
    return content ? (
        <div className='base-header-content'>
            {content}
        </div>
    ) : (
        <div className="user-info-wrapper">
            <span className="name-wrapper">Jenifer</span>
            <span className="user-online-info ">online 2 hours ago</span>
        </div>
    )
}

export default Header;