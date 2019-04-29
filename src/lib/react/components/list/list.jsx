import React from 'react';
import './list.css';
import DialogItem from '../dialog/dialogItem';

const List = (props) => {
    const items = props.items;
    return (
        <div className='list'>
            {dialogItems(items)}
        </div>
    );
};

const dialogItems = (items) => {
    return items.map((item) => {
        return (
            <DialogItem
                name={item.name}
                id={item.id}
                key={item.id}
                time={item.time}
                message={item.message}
            />
        );
    });
};

export default List;