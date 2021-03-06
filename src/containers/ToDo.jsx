import React, { useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import NewToDo from "../components/NewToDo";
import ToDoItem from "../components/ToDoItem";
import { useLocalStorage } from "../App.js";

const ToDo = (props) => {
  const [items, setItems] = useLocalStorage(`2du:items-${props.listId}`, []);
  const [showForm, setShowForm] = useState(false);
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

  const { title, createdOn } = props;
  return (
    <Card>
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <h6>Created {new Date(createdOn).toLocaleString()}</h6>
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
        <ListGroup variant="flush">
          {items.map((item, index) => {
            return (
              <ListGroup.Item key={index}>
                <ToDoItem
                  item={item}
                  num={index + 1}
                  id={item.id}
                  key={`todo-item-${item.id}`}
                  toggleItem={toggleItem}
                />
              </ListGroup.Item>
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
      </Card.Body>
    </Card>
  );
};

ToDo.propTypes = {
  title: PropTypes.string,
  numTasks: PropTypes.number,
  numCompleted: PropTypes.number,
};

export default ToDo;
