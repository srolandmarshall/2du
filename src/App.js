import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import ToDo from "./containers/ToDo.jsx";

library.add(faCheck, faTimes);

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <ToDo title="Amazon Test!" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
