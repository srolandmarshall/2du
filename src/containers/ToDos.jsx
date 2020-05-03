import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ToDo from "./ToDo.jsx";
import NewToDoList from "../components/NewToDoList.jsx";

const ToDos = () => {
  const [ToDoList, setToDoList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const createToDo = (title) => {
    const newList = {
      title: title,
      createdOn: new Date(),
    };
    setToDoList([...ToDoList, newList]);
    setShowForm(false);
  };

  useEffect(() => {
    window.localStorage.setItem("toDos", ToDoList);
    return (cleanUp = () => {});
  }, [ToDoList]);

  // https://www.youtube.com/watch?v=yu3dnHrnps4

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const newToDo = () => {
    setShowForm(true);
  };
  return (
    <>
      <Button onClick={newToDo}>New ToDo List</Button>
      {showForm && (
        <NewToDoList toggleForm={toggleForm} createToDo={createToDo} />
      )}
      {ToDoList.map((toDo) => {
        return <ToDo createdOn={toDo.createdOn} title={toDo.title} />;
      })}
    </>
  );
};

export default ToDos;
