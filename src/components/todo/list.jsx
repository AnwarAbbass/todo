import React from 'react';
import './list.scss';

const TodoList =(props)=>{
    return (
      <ul>
        {props.list.map(item => (
          <li
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => props.handleComplete(item._id)}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    );
  }
export default TodoList;