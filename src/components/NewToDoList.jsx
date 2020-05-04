import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewToDoList = (props) => {
  const [content, setContent] = useState("");
  const contentRef = React.createRef();

  const handleChange = () => {
    setContent(contentRef.current.value);
  };

  const handleSubmit = () => {
    if (content.length > 0) props.createToDo(content);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <InputGroup>
      <FormControl
        ref={contentRef}
        onChange={() => handleChange()}
        onKeyPress={handleKeyPress}
        placeholder="What do you need to do?"
        aria-label="New To Do Text Goes Here"
        aria-describedby="new-to-do"
      />
      <InputGroup.Append>
        <Button
          onClick={() => props.setShowNewToDoForm(false)}
          variant="outline-danger"
        >
          <FontAwesomeIcon icon="times" />
        </Button>
        <Button onClick={handleSubmit} variant="outline-success">
          <FontAwesomeIcon icon="check" />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default NewToDoList;
