import React, { useState } from "react";
import { Modal, Form, Container, Row, Col, Button } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import ToDo from "./containers/ToDo.jsx";
import NewToDoList from "./components/NewToDoList.jsx";

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
  const [showClearModal, setShowClearModal] = useState(false);
  const [listId, setListId] = useLocalStorage("2du:listId", 0);
  const [ToDoList, setToDoList] = useLocalStorage("2du:toDos", []);
  const [tempToDoList, setTempToDoList] = useState([]);
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
      const toDos = JSON.parse(objectVersion["2du:toDos"]);
      if (ToDoList.length > 0) {
        setShowClearModal(true);
        setTempToDoList(toDos);
      } else {
        setToDoList(toDos);
      }
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
    setFile({});
  };

  const replaceToDoList = (list) => {
    setShowClearModal(false);
    setToDoList(tempToDoList);
    setTempToDoList([]);
  };
  const handleClose = () => setShowClearModal(false);

  return (
    <div className="App">
      <Container>
        <Modal show={showClearModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Clear 2dus?</Modal.Title>
          </Modal.Header>
          <Modal.Body>This will clear all of your current 2dus.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => replaceToDoList([])}>
              That's OK!
            </Button>
          </Modal.Footer>
        </Modal>
        <Row className="padded">
          <Col className="padded" md={3}>
            <Button onClick={() => setShowNewToDoForm(true)}>
              New 2du List
            </Button>
          </Col>
          <Col className="padded" md={3}>
            <Button onClick={exportAllToJSON} variant="success">
              Export to JSON
            </Button>
          </Col>
          <Col className="padded" md={3}>
            <Row>
              <Form>
                <Form.File
                  onChange={onUpload}
                  onSubmit={onSubmit}
                  id="import-json"
                  label={file.name || "Import..."}
                  custom
                />
              </Form>
            </Row>
            <Row>
              <Col>
                {file.name && (
                  <Button className="padded" onClick={onSubmit}>
                    Upload JSON
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
          <Col className="padded" md={3}>
            <Button variant="danger" onClick={() => setShowClearModal(true)}>
              Clear Everything
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
          {ToDoList.map((toDo) => {
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
        </Row>
      </Container>
    </div>
  );
}

export default App;
