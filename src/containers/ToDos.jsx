import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ToDo from "./ToDo.jsx";
import NewToDoList from "../components/NewToDoList.jsx";
import { useLocalStorage } from "../App.js";

const ToDos = (props) => {
  const { toDoList, listId, setListId } = props;

  return (
    <>
      {toDoList.map((toDo) => {
        return (
          <Col className="padded" md={6}>
            <ToDo
              listId={toDo.listId}
              key={toDo.listId}
              createdOn={toDo.createdOn}
              title={toDo.title}
              items={toDo.items}
            />
          </Col>
        );
      })}
    </>
  );
};

export default ToDos;
