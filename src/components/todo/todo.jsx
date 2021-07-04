import React, { useState, useEffect } from 'react';
import {Container,Col,Row,Card} from 'react-bootstrap';
import TodoForm from './form';
import TodoList from './list';

// import './todo.scss';

const ToDo =(props)=> {
    const [list,listSet] = useState([]);

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    listSet([...list, item]);
  };

  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let newlist = list.map(listItem => listItem._id === item._id ? item : listItem);
      listSet(newlist);
    }

  };

  useEffect(() => {
    let list = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'},
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'},
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C'},
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'},
    ];

    listSet(list);
  },[listSet]);

  useEffect(() => {
    if (list.length >0) { 
      let complete = list.filter(item => !item.complete).length
      let incomplete = list.length - list.filter(item => !item.complete).length
      document.title = `complete/incomplete : ${complete} : ${incomplete}` 
    }
  }, [list]);

    return (
      <>
        <header>
          <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
          </h2>
        </header>

        <Container fluid="md" style={{ marginTop: '4rem' }}>
        <Row>
          <Col md={5}>
           <Card >
            <TodoForm handleSubmit={addItem} />
           </Card>
          </Col>

          <Col md={5}>
          {/* <Card> */}

            <TodoList
              list={list}
              handleComplete={toggleComplete}
            />
          {/* </Card> */}
          </Col>
        </Row>
        </Container>

      </>
    );
  }

export default ToDo;