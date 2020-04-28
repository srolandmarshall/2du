import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Card, ListGroup, Fade } from "react-bootstrap";
import NewToDo from "../components/NewToDo";
import ToDoItem from "../components/ToDoItem";

const ToDo = (props) => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [createdOn] = useState(new Date());
  const [itemId, setItemId] = useState(0);

  const createItem = (contents) => {
    if (contents.length > 0) {
      const newItem = {
        id: itemId,
        contents: contents,
        addedDate: new Date(),
        done: false,
      };
      setItems([...items, newItem]);
    }
    setItemId(itemId + 1);
    toggleForm();
  };

  function toggleItem(id) {
    setItems(
      items.map((item) => {
        if (item.id !== id) {
          return item;
        }
        const toggled = !item.done;
        console.log(`Toggling ${id} to ${toggled}`);

        return {
          ...item,
          done: toggled,
        };
      })
    );
  }

  const removeCheckedItems = () => {
    const newItems = items.filter((item) => !item.done);
    console.log(newItems);
    setItems(newItems);
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
          <Row>
            <Col>
              <p>Created {createdOn.toLocaleDateString()}</p>
            </Col>
            <Col>
              <Button
                onClick={removeCheckedItems}
                size="sm"
                variant="outline-primary"
              >
                Clear Checked Items
              </Button>
            </Col>
          </Row>

          <Card.Text>
            <ListGroup variant="flush">
              {items.map((item, index) => {
                return (
                  <Fade in={true}>
                    <ToDoItem
                      item={item}
                      num={index + 1}
                      id={item.id}
                      key={`todo-item-${item.id}`}
                      toggleItem={toggleItem}
                    />
                  </Fade>
                );
              })}
            </ListGroup>
            {showForm ? (
              <>
                <NewToDo createItem={createItem} toggleForm={toggleForm} />
              </>
            ) : (
              <Button className="add" variant="primary" onClick={toggleForm}>
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
