import React, { Component } from 'react'
import MessageTextArea from "../../../lib/react/components/message-textarea/messageTextarea";
import MessageWrapper from "../../../lib/react/components/message-wrapper/messageWrapper";
import Header from '../../../lib/react/components/header/header';
import { connect } from 'react-redux';
import * as chatActions from '../../store/actions/chat';
import {Redirect} from "react-router-dom";
import getSharedWorker from '../../worker/sharedWorkerUtil';

class Dialog extends Component{
    constructor(props) {
        super(props);
    }

    /**
     * while chatId is hardcoded
     */
    componentDidMount() {
        getSharedWorker().then((worker) => {
            worker.port.addEventListener('message', this.getChatFromWorker.bind(this));
            worker.port.start();
            worker.port.postMessage({type: 'getChat'});
        });
    }

    getChatFromWorker(event) {
        if(event.data.type === 'chat') {
            this.props.dispatch(chatActions.chatSet(event.data.data))
        }
    }

    /**
     * while in render is used only one dashboard
     * so this logic is in App.js while
     * after adding others dashboards it will be moved
     */
    render() {
        const { messages } = this.props;
        let authRedirect = null;

        if (!this.props.isAuthorized) {
            authRedirect = <Redirect to="/login"/>
        }

        return(
            <div>
                <Header/>
                <MessageWrapper
                    messages={messages}
                />
                <MessageTextArea
                    sendButtonCallback={this.sendButtonCallBack.bind(this)}
                />
                {authRedirect}
            </div>
        )
    }

    sendButtonCallBack(message){
        let formData = new FormData();
        if (message.type !== 'text') {
            formData.set('file', message.file)
        } else {
            formData.set('text', message.text)
        }
        this.props.dispatch(chatActions.fetchMessage(message));
    }
}

const mapStateToProps = state => {
    return {
        id: state.chat.id,
        messages: state.chat.messages,
        isAuthorized: state.user.token !== null && state.user.token !== undefined
    }
};


export default connect(mapStateToProps)(Dialog);