import React, { Component } from 'react'
import MessageTextArea from "../../../lib/react/components/message-textarea/messageTextarea";
import MessageWrapper from "../../../lib/react/components/message-wrapper/messageWrapper";
import Header from '../../../lib/react/components/header/header';


import axios from 'axios';

class Dialog extends Component{
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }


    /**
     * while in render is used only one dashboard
     * so this logic is in App.js while
     * after adding others dashboards it will be moved
     */
    render() {
        const { messages } = this.state;
        return(
            <div>
                <Header/>
                <MessageWrapper
                    messages={messages}
                />
                <MessageTextArea
                    sendButtonCallback={this.sendButtonCallBack.bind(this)}
                />
            </div>
        )
    }

    //TODO: remove hardcoded url and add services to app
    sendButtonCallBack(message){
        let formData = new FormData();
        if (message.type !== 'text') {
            formData.set('file', message.file)
        } else {
            formData.set('text', message.text)
        }
        axios.post('http://localhost:8081/api/message', formData)
            .then(this.setState({
                messages: this.state.messages.concat(message)
            }))
    }

}

export default Dialog;
