import React, { useState } from 'react';
// import './form.scss';
import { Button, Form } from 'react-bootstrap';


const TodoForm = (props) => {
  const [item,setItem] = useState({});

  const handleInputChange = e => {
    setItem({...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    const newitem = {};
    setItem({newitem});
  };

    return (
      <>
        <h3>Add Item</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
          <Form.Label>
            <span>To Do Item</span>
            </Form.Label>
            <Form.Control
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
          <Form.Label>
            <span>Difficulty Rating</span>
          </Form.Label>
            <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group>
          <Form.Label>
            <span>Assigned To</span>
          </Form.Label>
            <Form.Control type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
          <Form.Label> Due Date </Form.Label>
          <Form.Control
            size="sm"
            type="date"
            name="dueDate"
            placeholder="Date"
            onChange={handleInputChange}
          />
        </Form.Group>

          <Button type="submit" variant="primary">Add Item</Button>
        </Form>
      </>
    );
}

export default TodoForm;