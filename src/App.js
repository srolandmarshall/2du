import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import ToDos from "./containers/ToDos.jsx";
import NewToDoList from "./components/NewToDoList.jsx";

library.add(faCheck, faTimes);

export function useLocalStorage(key, defaultValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.log(e);
    }
    return defaultValue;
  });

  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

function App() {
  const [showNewToDoForm, setShowNewToDoForm] = useState(false);
  const [listId, setListId] = useLocalStorage("2du:listId", 0);
  const [ToDoList, setToDoList] = useLocalStorage("2du:toDos", []);

  const createToDo = (title) => {
    const newList = {
      listId: listId,
      title: title,
      createdOn: new Date(),
      items: [],
    };
    setToDoList([...ToDoList, newList]);
    setListId(listId + 1);
    setShowNewToDoForm(false);
  };

  return (
    <div className="App">
      <Container>
        <Row className="padded">
          <Col>
            <Button onClick={() => setShowNewToDoForm(true)}>
              New ToDo List
            </Button>
          </Col>

          {showNewToDoForm && (
            <NewToDoList
              createToDo={createToDo}
              showNewToDoForm={showNewToDoForm}
              setShowNewToDoForm={setShowNewToDoForm}
            />
          )}
        </Row>
        <Row>
          <ToDos toDoList={ToDoList} setListId={setListId} listId={listId} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
