import React, { Component } from 'react';
import Header from "../../../lib/react/components/header/header";
import List from "../../../lib/react/components/list/list";
import { connect } from 'react-redux';
import * as chatsActions from '../../store/actions/chats';

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
            </div>
        )
    }

    componentDidMount() {
        this.props.dispatch(chatsActions.fetchChats());
    }
}

const mapStateToProps = state => {
    return {
        chats: state.chats.chats
    }
};

export default connect(mapStateToProps)(Chats);