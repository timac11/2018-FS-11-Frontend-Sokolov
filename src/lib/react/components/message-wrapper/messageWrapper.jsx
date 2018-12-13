import React, { Component } from 'react';
import './messageWrapper.css';
import Message from './../message/message'

class MessageWrapper extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * messages here - are objects with fields:
     * text type and time
     * @returns {*}
     */

    render () {
        const { messages } = this.props;
        return (
            <div className='messages-wrapper'>
                <div className='active-window-body'>
                    {this.renderMessages(messages)}
                </div>
            </div>
        )
    }

    renderMessages (messages) {
        return messages.map(message => {
            return <Message
                key={message.id}
                message={message}
            />
        })
    }
}

export default MessageWrapper;