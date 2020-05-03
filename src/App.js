import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import ToDos from "./containers/ToDos.jsx";

library.add(faCheck, faTimes);

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <ToDos />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
