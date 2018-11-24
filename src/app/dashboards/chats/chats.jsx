import React, { Component } from 'react';
import Header from "../../../lib/react/components/header/header";
import List from "../../../lib/react/components/list/list";


class Chats extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        /**
         * to customize header to place here
         * messenger text instead of user name and photo
         */
        return(
            <div>
                <Header
                    content={"Messenger"}
                    actionButtonHidden={true}
                    searchButtonHidden={true}
                    avatarHidden={true}
                />
                <List/>
            </div>
        )
    }

}

export default Chats;