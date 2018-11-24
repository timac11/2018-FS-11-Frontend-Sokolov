import React, { Component } from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//dashboards
import Dialog from './dashboards/dialog/dialog';
import Chats from './dashboards/chats/chats';

class App extends Component{
    constructor(props) {
        super(props);
    }

    /**
     * while in render is used only one dashboard
     * so this logic is in App.js while
     * after adding others dashboards it will be moved
     */
    render() {
        return(
            <Router>
                <div>
                    <Route path='/dialog/:dialogId' component={Dialog}/>
                    <Route path='/chats' component={Chats}/>
                </div>
            </Router>
        )
    }
}

export default App;