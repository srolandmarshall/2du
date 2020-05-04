import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import ToDos from "./containers/ToDos.jsx";
import NewToDoList from "./components/NewToDoList.jsx";
import { saveAs } from "file-saver";

library.add(faCheck, faTimes);

var FileSaver = require("file-saver");

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
  const [file, setFile] = useState({});

  const exportAllToJSON = () => {
    const json = JSON.stringify(localStorage);
    var blob = new Blob([json], { type: "application/json;charset=utf-8" });
    FileSaver.saveAs(blob, "2du.json");
  };

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

  const onUpload = (e) => {
    console.log("Uploaded");
    let saved = {};
    try {
      saved = e.target.files[0];
    } catch (err) {
      console.log(err);
    }
    setFile(saved);
  };

  const onSubmit = (e) => {
    let reader = new FileReader();
    reader.readAsText(file);
    window.localStorage.clear();
    reader.onload = function () {
      const objectVersion = JSON.parse(reader.result);
      for (let [key, value] of Object.entries(objectVersion)) {
        window.localStorage.setItem(key, value);
      }
      setToDoList(JSON.parse(objectVersion["2du:toDos"]));
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
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
        <Row className="padded">
          <Col>
            <Button onClick={exportAllToJSON} variant="success">
              Export to JSON
            </Button>
          </Col>
          <Col>
            <input type="file" onChange={onUpload} />
            {file.name && <Button onClick={onSubmit}>Upload</Button>}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
