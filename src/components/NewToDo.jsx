import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewToDo = (props) => {
  const contentRef = React.createRef();

  const handleChange = () => {
    const value = contentRef.current.value;
    console.log(value);
  };

  const handleSubmit = () => {
    props.createItem(contentRef.current.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
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
          <Button onClick={props.toggleForm} variant="outline-danger">
            <FontAwesomeIcon icon="times" />
          </Button>
          <Button onClick={handleSubmit} variant="outline-success">
            <FontAwesomeIcon icon="check" />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </>
  );
};

export default NewToDo;
