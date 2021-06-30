import React, { useState } from 'react';
// import './form.scss';
import { Button, Form ,Card} from 'react-bootstrap';


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
        <Card>
        <Form onSubmit={handleSubmit}>
        
          <Form.Label>
            <span>To Do Item</span>
            </Form.Label>
            <Form.Control
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
              />
          <br></br>
        
          <Form.Label>
            <span>Difficulty Rating</span>
          </Form.Label>
            <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
          
            <br></br>
          <Form.Label>
            <span>Assigned To</span>
          </Form.Label>
          <Form.Control type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
            <br></br>
          <Form.Label> Due Date </Form.Label>
          <Form.Control
            size="sm"
            type="date"
            name="dueDate"
            placeholder="Date"
            onChange={handleInputChange}
          />
        
        <br></br>
          <Button type="submit" variant="primary">Add Item</Button>
        </Form>
        </Card>

        {/* <Form.Group onSubmit={handleSubmit}>
          <Form.Label><span>To Do Item</span></Form.Label>
          <Form.Control 
          name="text"
          placeholder="Add To Do List Item"
          onChange={handleInputChange} />
            <br />
          <Form.Control type="text" placeholder="Normal text" />
          <br />
           <Form.Control size="sm" type="text" placeholder="Small text" />
        </Form.Group>
         */}
      </>
    );
}

export default TodoForm;