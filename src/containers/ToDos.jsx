import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ToDo from "./ToDo.jsx";

const ToDos = () => {
  const [ToDoList, setToDoList] = useState([]);
  const newToDo = () => {
    const newList = {
      title: "Test",
      createdOn: new Date(),
    };
    setToDoList([...ToDoList, newList]);
  };
  return (
    <>
      <Button onClick={newToDo}>New ToDo List</Button>
      {ToDoList.map((toDo) => {
        return <ToDo title={toDo.title} />;
      })}
    </>
  );
};

export default ToDos;
