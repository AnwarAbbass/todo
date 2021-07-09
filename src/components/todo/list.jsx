import React, { useState } from "react";
// import { ListGroup } from 'react-bootstrap';
import "./list.scss";
// import If from '../if/if';
import { When } from "react-if";
import { ListGroup, Badge, Button, Form } from "react-bootstrap";

const TodoList = (props) => {
  const [isUpdate, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [start, setstart] = useState(0);
  const [end, setend] = useState(3);

  const deleteHandler = (e) => {
    const id = e.target.value;
    props.handleDelete(id);
  };

  const toggleUpdate = (e) => {
    const id = e.target.value;
    setUpdate(!isUpdate);
    setId(id);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    let _id = id;
    let text = e.target.text.value;
    let assign = e.target.assign.value;
    let difficult = e.target.difficulty.value;
    let obj = {
      _id: _id,
      text: text,
      assign: assign,
      difficult: difficult,
    };
    props.handleUpdate(obj);
    e.target.reset();
    setUpdate(!isUpdate);
  };

  return (
    <>
    <Form onSubmit={}>
      <Form.Label>How Many Item You Want to see ?</Form.Label>
      <Form.
    </Form>
      <ListGroup>
        {props.list.slice(start, end).map((item) => (
          <>
            {console.log("50 ---------------", item.complete)}
            <ListGroup.Item
              onClick={() => props.handleComplete(item._id)}
              className={`complete-${item.complete}`}
              key={item._id}
              action
              variant={item.complete ? "success" : "danger"}
            >
              <span>
                <Badge
                  variant={item.complete ? "success" : "danger"}
                  className="compleatedOrNot"
                >
                  {item.complete ? "Completed" : "pending"}
                </Badge>
                <Badge variant="light" className="assignedTo">
                  {item.assign}
                </Badge>
                <Badge variant="dark" className="difficult">
                  Difficulty: {item.difficult}
                </Badge>

                <p>{item.text}</p>
                <p> Due Date: {item.dueDate}</p>
              </span>
            </ListGroup.Item>
            <div>
              <Button onClick={deleteHandler} value={item._id} variant="danger">
                {" "}
                X{" "}
              </Button>
              <Button onClick={toggleUpdate} value={item._id} variant="info">
                Edit
              </Button>
            </div>
          </>
        ))}
        <div className="formToEdit">
          <When condition={isUpdate === true}>
            <Form onSubmit={submitHandler}>
              <input type="hidden" name="_id"></input>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Edit the Task</Form.Label>
                <Form.Control type="text" name="text" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Assigned To</Form.Label>
                <Form.Control type="text" name="assign" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Difficulty</Form.Label>
                <Form.Control type="range" name="difficulty" />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name="dueDate" />
              </Form.Group>

              <input type="submit" value="Edit"></input>
            </Form>
          </When>
        </div>
      </ListGroup>
      <Button
        onClick={(e) => {
          let renderNumber=Math.ceil(props.list.length/3)
          if(start<end && start>0){
            setend(start );
            if(start-renderNumber>-1) setstart(start-renderNumber);
            else setstart(0)
          }
          else {
            setstart(start);
            setend(end);}
          console.log(Math.ceil(props.list.length/3));
        }}
        >
        {console.log(start,end,props.list.length)}
        Previous
      </Button>
      <Button
        onClick={(e) => {
          let renderNumber=Math.ceil(props.list.length/3)
          if(start<end && end<props.list.length){
            setstart(end);
            setend(end +renderNumber);}
          else {
            setstart(start);
            setend(end);}
          console.log(Math.ceil(props.list.length/3));
        }}
        >
        {console.log(start,end,props.list.length)}
        Next
      </Button>
    </>
  );

  // return (
  //   <>
  //     <ListGroup>
  //     {props.list.map(item => (
  //         <ListGroup.Item
  //         style={{cursor:'pointer'}} variant={(item.complete) ? 'danger' : 'success'}
  //         className={`complete-${item.complete.toString()}`}
  //         key={item._id}
  //          onClick={() => props.handleComplete(item._id)}>
  //           {item.text}
  //         {/* </span> */}

  //         <div className="buttonContainer">
  //           <Button onClick={deleteHandler} value={item._id} variant="danger">
  //             {" "}
  //             X{" "}
  //           </Button>
  //           <Button onClick={toggleUpdate} value={item._id} variant="info" >
  //             Edit
  //           </Button>
  //         </div>
  //         </ListGroup.Item>
  //     ))}
  //     </ListGroup >

  //   <If condition={isUpdate}>
  //         <Form onSubmit={submitHandler}>
  //           <input type="hidden" name="_id"></input>

  //           <Form.Group controlId="formBasicEmail">
  //             <Form.Label>Edit the Task</Form.Label>
  //             <Form.Control type="text" name="text" />
  //           </Form.Group>
  //           <Form.Group controlId="formBasicEmail">
  //             <Form.Label>Assigned To</Form.Label>
  //             <Form.Control type="text" name="assign" />
  //           </Form.Group>

  //           <Form.Group controlId="formBasicEmail">
  //             <Form.Label>Difficulty</Form.Label>
  //             <Form.Control type="range" name="difficult" />
  //           </Form.Group>
  //           <Form.Group controlId="formBasicEmail">
  //             <Form.Label>Due Date</Form.Label>
  //             <Form.Control type="date" name="dueDate" />
  //           </Form.Group>

  //           <input type="submit" value="Edit"></input>
  //         </Form>
  //       </If>
  //   </>
  // );
};
export default TodoList;
