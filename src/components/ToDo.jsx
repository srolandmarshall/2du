import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import NewToDo from "./NewToDo";

const ToDo = (props) => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [createdOn] = useState(new Date());

  const createItem = (contents) => {
    const newItem = {
      contents: contents,
      addedDate: new Date(),
    };
    setItems([...items, newItem]);
    toggleForm();
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const { title } = props;
  return (
    <div>
      <Card>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Card.Title>Created {createdOn.toLocaleDateString()}</Card.Title>
          <Card.Text>
            <>
              {items.map((item, index) => (
                <li key={index}>{item.contents}</li>
              ))}
            </>
            {showForm ? (
              <>
                <NewToDo createItem={createItem} toggleForm={toggleForm} />
              </>
            ) : (
              <Button variant="primary" onClick={toggleForm}>
                Add To Do
              </Button>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

ToDo.propTypes = {
  title: PropTypes.string,
  numTasks: PropTypes.number,
  numCompleted: PropTypes.number,
  createdOn: PropTypes.instanceOf(Date),
};

export default ToDo;
