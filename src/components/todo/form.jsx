import React, { useState } from 'react';
import {Container,Form,Button} from 'react-bootstrap';

// import './form.scss';

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
      <Container>
        <h3>Add Item</h3>
        <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>
            <Form.Text>To Do Item</Form.Text>
            <Form.Control
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
            />
          </Form.Label>
          <br></br>
          <Form.Label>
            <Form.Text>Difficulty Rating</Form.Text>
            <Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
          </Form.Label>
          <br></br>
          <Form.Label>
            <Form.Text>Assigned To</Form.Text>
            <Form.Control type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
          </Form.Label>
          </Form.Group>
          <Button type='submit' variant="primary">Add Item</Button>
        </Form>
        </Container>
      </>
    );
}

export default TodoForm;