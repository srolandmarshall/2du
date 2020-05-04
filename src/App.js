import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import ToDos from "./containers/ToDos.jsx";

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
  const [listId, setListId] = useLocalStorage("2du:listId", 0);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <ToDos setListId={setListId} listId={listId} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
