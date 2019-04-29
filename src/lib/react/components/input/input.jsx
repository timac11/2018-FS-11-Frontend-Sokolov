import React from 'react';
import './input.css';

const input = props => {
    let inputElement = null;
    switch (props.elementType) {
        case('input'):
            inputElement = <input
                className='input-element'
                onChange={props.changed}
                {...props.elementConfig}
            />;
            break;
        case('textarea'):
            inputElement = <textarea
                className='input-element'
                onChange={props.changed}
                {...props.elementConfig}
            />;
            break;
        default:
            inputElement = <input
                className='input-element'
                onChange={props.changed}
                {...props.elementConfig}
            />;
                break;
    }

    return (
        <div className='input'>
            <label className='label'>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;