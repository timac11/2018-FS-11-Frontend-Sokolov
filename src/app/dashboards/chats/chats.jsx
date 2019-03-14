import React, { Component } from 'react';
import Header from "../../../lib/react/components/header/header";
import List from "../../../lib/react/components/list/list";
import { connect } from 'react-redux';
import * as chatsActions from '../../store/actions/chats';
import { Redirect } from 'react-router-dom';
import getSharedWorker from '../../worker/sharedWorkerUtil';

class Chats extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        /**
         * to customize header to place here
         * messenger text instead of user name and photo
         */
        const {chats} = this.props;

        let authRedirect = null;

        if (!this.props.isAuthorized) {
            authRedirect = <Redirect to="/login"/>
        }

        return(
            <div>
                <Header
                    content={"Messenger"}
                    actionButtonHidden={true}
                    searchButtonHidden={true}
                    avatarHidden={true}
                />
                <List
                    items={chats}
                />
                {authRedirect}
            </div>
        )
    }

    componentDidMount() {
        getSharedWorker().then((worker) => {
            worker.port.addEventListener('message', this.getChatsFromWorker.bind(this));
            worker.port.start();
            worker.port.postMessage({type: 'getChats'});
        });
    }

    getChatsFromWorker(event) {
        if(event.data.type === 'chats') {
            this.props.dispatch(chatsActions.chatsSet(event.data.data))
        }
    }
}

const mapStateToProps = state => {
    return {
        chats: state.chats.chats,
        isAuthorized: state.user.token !== null && state.user.token !== undefined
    }
};

export default connect(mapStateToProps)(Chats);