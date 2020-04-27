import React, { useState } from "react";
import { Fade, ListGroup } from "react-bootstrap";

const ToDoItem = (props) => {
  const [done, setDone] = useState(false);
  const { item, key, num } = props;
  const toggleItem = (params) => {
    console.log(`Checked: ${done}`);

    setDone(!done);
  };

  const testLabel = () => {
    console.log("Label click");
    setDone(!done);
  };

  return (
    <Fade appear={true} in={true}>
      <ListGroup.Item onClick={toggleItem} action key={key}>
        <input
          type="checkbox"
          id={`item-${num}`}
          name={`item-${num}`}
          checked={done}
        />
        <span className="label">
          {num}. {item.contents}
        </span>
      </ListGroup.Item>
    </Fade>
  );
};

export default ToDoItem;
