import React , {useState} from 'react';
// import { ListGroup } from 'react-bootstrap';
import './list.scss';
import If from '../if/if';
import { ListGroup, Badge, Button, Form } from "react-bootstrap";


const TodoList =(props)=>{

  const [isUpdate,setUpdate]=useState(false)
  const [id,setId]= useState('');

  const deleteHandler = (e)=>{
    const id = e.target.value;
    props.handleDelete(id);

  }

  const toggleUpdate = (e)=>{
    const id = e.target.value
  setUpdate(!isUpdate);
  setId(id);
  };

  const submitHandler =(e)=>{
    e.preventDefault();
    let _id = id;
    let text = e.target.text.value;
    let assign = e.target.assign.value;
    let difficult = e.target.difficult.value;
    let obj = {
      _id: _id,
      text: text,
      assign: assign,
      difficult: difficult,
    };
    props.handleEdited(obj);
    e.target.reset();
    setUpdate(!isUpdate);
  }
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