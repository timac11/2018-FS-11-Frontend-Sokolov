import React, { Component } from 'react'
import FileInput from "./file-input/fileInput";
import './messageTextarea.css';
import PropTypes from 'prop-types';

class MessageTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textAreaValue: ''
        }
    }

    render() {
        const { sendButtonCallBack } = this.props;
        return (
            <div className="message-textarea">
                <textarea className="textarea"
                          value={this.state.textAreaValue}
                          placeholder="Message"
                          onChange={this.handleTextAreaChange.bind(this)}
                />
                <button className="send-button"
                        onClick={this.sendButtonClick.bind(this)}>Send
                </button>
                <FileInput
                    fileUploadButtonCallback={this.props.sendButtonCallback}
                />
            </div>
        )
    }

    handleTextAreaChange(event) {
        this.setState({textAreaValue: event.target.value});
    }

    sendButtonClick() {
        const text = this.state.textAreaValue;
        const message = this.createTextMessage(text);

        if (text !== '') {

            this.props.sendButtonCallback(message);

            this.setState({
                textAreaValue: ''
            });
        }
    }

    createTextMessage(text) {
        return {
            text: text,
            type: 'text'
        }
    }
}

MessageTextArea.propTypes = {
    sendButtonCallback: PropTypes.func
}

export default MessageTextArea;