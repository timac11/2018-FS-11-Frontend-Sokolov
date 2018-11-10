import React from 'react';
import './message.css';

const Message = (props) => {
    return (
        <div className='sended-body-message'>
            {createMessageContent.bind(this)(props.message)}
        </div>
    )
}

const TextMessage = (props) => {
    return (
        <span>{props.text}</span>
    )
}

const DocumentMessage = (props) => {
    return (
        <a href={props.href}>{props.fileName}</a>
    )
}

const ImageMessage = (props) => {
    return (
        <img src={props.imagePath}/>
    )
}

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
}

export default Message;
