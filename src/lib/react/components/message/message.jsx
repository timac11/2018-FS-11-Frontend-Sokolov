import React from 'react';
import './message.css';
import './../../../utils/readable-size-util'
import {getReadableSize} from "../../../utils/readable-size-util";

const Message = (props) => {
    const cssClass = props.message.new ? 'sended-body-message sended-body-message-new' : 'sended-body-message';
    return (
        <div className={cssClass}>
            {createMessageContent.bind(this)(props.message)}
            {createInfoContent.bind(this)(props.message)}
        </div>
    )
};

const TextMessage = (props) => {
    return(
        <div style={{display: 'block'}} dangerouslySetInnerHTML={{__html: props.text}}/>
    )
};

const DocumentMessage = (props) => {
    return (
        <a href={props.href}>{props.fileName}</a>
    )
};

const ImageMessage = (props) => {
    return (
        <img src={props.imagePath}/>
    )
};

const createInfoContent = (message) => {
    const time = [
        new Date().getHours(),
        new Date().getMinutes()
    ].map(num => num < 10 ? '0' + num : num).join(':');

    if (message.file) {
        const size = getReadableSize(message.size);
        return (
            <div className='message-info-block'>
                <span className='file-size'>{size}</span>
                <span className='message-time'>{time}</span>
            </div>
        )
    } else {
        return (
            <div className='message-info-block'>
                <span className='message-time'>{time}</span>
            </div>
        )
    }
};

const createMessageContent = (message) => {
    const imagePattern = /^image\.*/;
    if (message.file) {
        const file = message.file;
        if (file.type.match(imagePattern)) {
            const fileUrl = URL.createObjectURL(file);
            return (
                <ImageMessage
                    imagePath={fileUrl}
                />
            )
        } else {
            const href = URL.createObjectURL(file);
            const fileName = file.name;
            return (
                <DocumentMessage
                    href={href}
                    fileName={fileName}
                />
            )
        }
    } else {
        return (
            <TextMessage
                text={message.text}
            />
        )
    }
};

export default Message;
