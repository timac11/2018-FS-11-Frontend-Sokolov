import React from 'react';
import './message.css';

const Message = (props) => {
    return (
        <div className='sended-body-message'>
            {props.message.text}
        </div>
    )
}

export default Message;