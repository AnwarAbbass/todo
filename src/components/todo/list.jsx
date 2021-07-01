import React from 'react';
// import './list.scss';
import {ListGroup }from 'react-bootstrap';

const TodoList =(props)=>{
    return (
      <ul>
        {props.list.map(item => (
          <ListGroup 
            className={`complete-${item.complete.toString()}`}
            key={item._id}
            style={{cursor:'pointer'}} variant={(item.complete) ? 'danger' : 'success'}
          >
            <ListGroup.Item onClick={() => props.handleComplete(item._id)}>
              {item.text}
            </ListGroup.Item>
          </ListGroup >
        ))}
      </ul>
    );
  }
export default TodoList;