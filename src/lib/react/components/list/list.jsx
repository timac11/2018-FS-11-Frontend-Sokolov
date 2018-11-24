import React from 'react';
import './list.css';
import DialogItem from '../dialog/dialogItem'

const List = (props) => {
    const { children } = props;
    return (
        <div className='list'>
            <DialogItem/>
            <DialogItem/>
            <DialogItem/>
        </div>
    )
}

export default List;