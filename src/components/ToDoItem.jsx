import React, { useState } from "react";

const ToDoItem = (props) => {
  const { toggleItem, num } = props;
  const [item, setItem] = useState(props.item);

  const handleChange = () => {
    toggleItem(item.id);
    const toggle = !item.done;
    setItem({
      ...item,
      done: toggle,
    });
  };

  return (
    <div key={item.key} className="to-do" onClick={handleChange}>
      <input
        key={item.key}
        name={`checkbox-${item.id}`}
        type="checkbox"
        checked={item.done}
        readOnly
      />
      <span key={item.key} className="label" id={`checkbox-${item.id}-label`}>
        {num}. {item.contents}
      </span>
    </div>
  );
};

export default ToDoItem;
