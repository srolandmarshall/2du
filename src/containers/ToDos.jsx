import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ToDo from "./ToDo.jsx";
import NewToDoList from "../components/NewToDoList.jsx";
import { useLocalStorage } from "../App.js";

const ToDos = (props) => {
  const [ToDoList, setToDoList] = useLocalStorage("2du:toDos", []);
  const [showForm, setShowForm] = useState(false);
  const { listId, setListId } = props;

  const createToDo = (title) => {
    const newList = {
      listId: props.listId,
      title: title,
      createdOn: new Date(),
      items: [],
    };
    setToDoList([...ToDoList, newList]);
    setListId(listId + 1);
    setShowForm(false);
  };

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
          <ToDo
            listId={toDo.listId}
            key={toDo.listId}
            createdOn={toDo.createdOn}
            title={toDo.title}
            items={toDo.items}
          />
        );
      })}
    </>
  );
};

export default ToDos;
