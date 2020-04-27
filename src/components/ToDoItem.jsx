import React, { useState } from "react";
import { InputGroup, ListGroup } from "react-bootstrap";

const ToDoItem = (props) => {
  const [done, setDone] = useState(false);
  const { item, key, num } = props;
  const toggleItem = (params) => {
    setDone(!done);
  };

  return (
    <ListGroup.Item action onClick={toggleItem} key={key}>
      <input type="checkbox" id={num} name={num} checked={done} />
      <label class="form-check-label" for={num}>
        {num}. {item.contents}
      </label>
    </ListGroup.Item>
  );
};

export default ToDoItem;
