import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ToDo from "./ToDo.jsx";
import NewToDoList from "../components/NewToDoList.jsx";

const ToDos = () => {
  const [ToDoList, setToDoList] = useState(() => {
    let toDos;
    try {
      toDos = JSON.parse(window.localStorage.getItem("2du:toDos") || []);
    } catch (e) {
      console.log("caught in useState");
      toDos = [];
    }
    return toDos;
  });
  const [showForm, setShowForm] = useState(false);
  const [listId, setListId] = useState(0);

  const createToDo = (title) => {
    const newList = {
      id: listId,
      title: title,
      createdOn: new Date(),
    };
    setToDoList([...ToDoList, newList]);
    setListId(listId + 1);
    setShowForm(false);
  };

  useEffect(() => {
    window.localStorage.setItem("2du:toDos", JSON.stringify(ToDoList));
  }, [ToDoList]);

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
        return (
          <ToDo key={toDo.id} createdOn={toDo.createdOn} title={toDo.title} />
        );
      })}
    </>
  );
};

export default ToDos;
