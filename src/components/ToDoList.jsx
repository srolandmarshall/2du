import React from "react";
import { ListGroup } from "react-bootstrap";
import ToDoItem from "./ToDoItem";
const ToDoList = (props) => {
  const { items } = props;

  return (
    <ListGroup variant="flush">
      {items.map((item, index) => (
        <ToDoItem item={item} num={index + 1} key={index} />
      ))}
    </ListGroup>
  );
};

export default ToDoList;
