import React, { Component } from 'react'
import MessageTextArea from "../../../lib/react/components/message-textarea/messageTextarea";
import MessageWrapper from "../../../lib/react/components/message-wrapper/messageWrapper";
import Header from '../../../lib/react/components/header/header';
import { connect } from 'react-redux';
import * as chatActions from '../../store/actions/chat';


class Dialog extends Component{
    constructor(props) {
        super(props);
    }

    /**
     * while chatId is hardcoded
     */
    componentDidMount() {
        this.props.dispatch(chatActions.fetchChat(1));
    }

    /**
     * while in render is used only one dashboard
     * so this logic is in App.js while
     * after adding others dashboards it will be moved
     */
    render() {
        const { messages } = this.props;
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
    }
};


export default connect(mapStateToProps)(Dialog);