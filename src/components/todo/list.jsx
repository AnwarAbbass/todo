import React from 'react';
// import './list.scss';
import {ListGroup }from 'react-bootstrap';

const TodoList =(props)=>{
    return (
      <ul>
        <ListGroup 
        >
        {props.list.map(item => (
            <ListGroup.Item
            style={{cursor:'pointer'}} variant={(item.complete) ? 'danger' : 'success'}
            className={`complete-${item.complete.toString()}`}
            key={item._id}
             onClick={() => props.handleComplete(item._id)}>
              {item.text}
              </ListGroup.Item>
        ))}
        </ListGroup >
      </ul>
    );
  }
export default TodoList;