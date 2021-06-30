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
    props.handleUpdate(obj);
    e.target.reset();
    setUpdate(!isUpdate);
  }
    return (
      <>
      <ul>
        {props.list.map(item => (
          <li
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => props.handleComplete(item._id)}>
              {item.text}
            </span>
          

            <div className="buttonContainer">
              <Button size="sm" onClick={deleteHandler} value={item._id} variant="danger">
                {" "}
                X{" "}
              </Button>
              <Button onClick={toggleUpdate} value={item._id} variant="info" size="sm" >
                Edit
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <If condition={isUpdate}>
            <Form onSubmit={submitHandler}>
              <input type="hidden" name="_id"></input>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Edit the Task</Form.Label>
                <Form.Control size="sm" type="text" name="text" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Assigned To</Form.Label>
                <Form.Control size="sm" type="text" name="assign" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Difficulty</Form.Label>
                <Form.Control size="sm" type="range" name="difficult" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Due Date</Form.Label>
                <Form.Control size="sm" type="date" name="dueDate" />
              </Form.Group>

              <input type="submit" value="Edit"></input>
            </Form>
          </If>
      </>
    );
  }
export default TodoList;