import React from 'react';
import './dialogItem.css'

const DialogItem = (props) => {
    return (
        <div className='dialog-item'>
            <div className="dialog-item-image-wrapper">
                <img className="user-img" src="../resources/img/1.png"/>
            </div>
            <div className="dialog-item-info-wrapper">
                <div className='dialog-item-user-info-wrapper'>
                    <span className="name-wrapper">Jenifer</span>
                    <span className='dialog-item-time'>15:52</span>
                </div>
                <div className="dialog-item-last-message">Last message content</div>
            </div>
        </div>
    )
}

export default DialogItem;