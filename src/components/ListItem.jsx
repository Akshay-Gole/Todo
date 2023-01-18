import React, { useState } from 'react'
import { TiTick } from 'react-icons/ti'
import { RxCross2 } from 'react-icons/rx'

function ListItem({ setTodo, onDelete, item }) {

    const handleToDoComplete = (id) => {
        setTodo(id)
    }
    return (
        <div className={`list ${item.todo ? '' : 'bg'}`}>
            <div className='checked' onClick={() => handleToDoComplete(item.id)}>{item.todo ? '' : <TiTick />}</div>
            <div className={`${item.todo ? 'to-do-item' : 'to-do-item-completed'}`} onClick={() => handleToDoComplete(item.id)}>{item.title}</div>
            <div className='cross' onClick={() => onDelete(item.id)}><RxCross2 /></div>
        </div>
    )
}

export default ListItem