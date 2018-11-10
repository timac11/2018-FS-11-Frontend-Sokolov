import React, { Component } from 'react'
import './fileInput.css'

class FileInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="upload-btn-wrapper">
                <button className="upload-btn">File</button>
                <input type="file"/>
            </div>
        )
    }
}

export default FileInput;