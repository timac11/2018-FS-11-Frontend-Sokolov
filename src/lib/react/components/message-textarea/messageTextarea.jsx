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
        const { sendButtonCallBack } = this.props;
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
                <button className="send-button" onClick={() => {
                    this.setState((state) => ({
                        emojiShow: !state.emojiShow
                    }));
                }}>
                    Emoji
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

    handleTextAreaChange(event) {
        this.setState({textAreaValue: event.target.value});
    }

    sendButtonClick() {
        let text = this.state.textAreaValue;

        let textArea = ReactDOM.findDOMNode(this);
        let textInner = textArea.querySelector('.textarea');
        text = textInner.innerHTML;

        const message = this.createTextMessage(text);

        if (text !== '') {

            this.props.sendButtonCallback(message);

            /*this.setState({
                textAreaValue: ''
            });*/
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