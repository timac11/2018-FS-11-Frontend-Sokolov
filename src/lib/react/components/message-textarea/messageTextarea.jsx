import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import FileInput from './file-input/fileInput'
import Emoji from '../emoji/emoji'
import './messageTextarea.css';

class MessageTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html: '',
            emojiShow: false
        }
    }

    render() {
        return (
            <div className="message-textarea">
                <div className="textarea"
                     placeholder="Message"
                     contentEditable="true"
                     dangerouslySetInnerHTML={{__html: this.state.html}}
                     ref='textarea'
                />
                <button className="send-button"
                        onClick={this.sendButtonClick.bind(this)}>
                    Send
                </button>
                <Emoji
                    emojiShow={this.state.emojiShow}
                    emojiClick={this.addEmoji.bind(this)}
                />
                <FileInput
                    fileUploadButtonCallback={this.props.sendButtonCallback}
                />
            </div>
        )
    }

    addEmoji(emojiKey) {
        let textArea = ReactDOM.findDOMNode(this);
        let textInner = textArea.querySelector('.textarea');
        const emojiclass = emojiKey + ' emoji';
        textInner.innerHTML = textInner.innerHTML + '<img class="' + emojiclass + '"/>'
    }

    sendButtonClick() {
        let textArea = ReactDOM.findDOMNode(this);
        let textInner = textArea.querySelector('.textarea');
        let text = textInner.innerHTML;

        const message = this.createTextMessage(text);

        if (text !== '') {
            this.props.sendButtonCallback(message);
            textInner.innerHTML = '';
        }
    }

    createTextMessage(text) {
        return {
            text: text,
            type: 'text'
        }
    }
}

export default MessageTextArea;