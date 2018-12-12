import React from 'react';
import './dialogItem.css'
import { withRouter } from 'react-router-dom'

const DialogItem = (props) => {
    return (
        <div className='dialog-item' onClick={() => {itemClick(props)}}>
            <div className="dialog-item-image-wrapper">
                <img className="user-img" src="../resources/img/1.png"/>
            </div>
            <div className="dialog-item-info-wrapper">
                <div className='dialog-item-user-info-wrapper'>
                    <span className="name-wrapper">{props.name}</span>
                    <span className='dialog-item-time'>{props.time}</span>
                </div>
                <div className="dialog-item-last-message">{props.message}</div>
            </div>
        </div>
    )
};

const itemClick = (props) => {
    props.history.push('/chats/' + props.id);
};

export default withRouter(DialogItem);