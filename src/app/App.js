import React, { Component } from 'react';
import Dialog from './dashboards/dialog/dialog';
import './index.css';

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
            <Dialog/>
        )
    }
}

export default App;