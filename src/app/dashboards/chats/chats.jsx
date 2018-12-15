import React, { Component } from 'react';
import Header from "../../../lib/react/components/header/header";
import List from "../../../lib/react/components/list/list";
import { connect } from 'react-redux';
import * as chatsActions from '../../store/actions/chats';
import { Redirect } from 'react-router-dom';

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
        this.props.dispatch(chatsActions.fetchChats());
    }
}

const mapStateToProps = state => {
    return {
        chats: state.chats.chats,
        isAuthorized: state.user.token !== null && state.user.token !== undefined
    }
};

export default connect(mapStateToProps)(Chats);