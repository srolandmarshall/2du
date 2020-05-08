import React, { useState, useEffect } from "react";
import { Col, Button } from "react-bootstrap";
import DropDown from "./DropDown.jsx";
import useSessionstorage from "@rooks/use-sessionstorage";

const GistLoaded = (props) => {
  const [selectedGistFile, setSelectedGistFile] = useState({});

  useEffect(() => {
    setGistFiles(gist["files"]);
  }, []);

  const labelFunction = (file) => {
    return `${file[Object.keys(file)[0]]["filename"]}`;
  };
  const { setGistFiles, gistFiles, gist, useGistFile, reset } = props;

  const valueFunction = (file) => {
    try {
      return `${file[Object.keys(file)[0]]["filename"]}`;
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (filename) => {
    const file = gistFiles[filename];
    setSelectedGistFile(file);
  };

  const UseSelectedGistFile = () => {
    console.log(`Using Gist ${selectedGistFile["filename"]}`);
    useGistFile(selectedGistFile);
  };

  const generateOptions = () => {
    return Object.keys(gistFiles).map(function (key, i) {
      return { [key]: Object.values(gist["files"])[i] };
    });
  };

  return (
    <>
      <Col>
        Gist File Picker
        <DropDown
          labelFunction={labelFunction}
          valueFunction={valueFunction}
          onChange={onChange}
          options={generateOptions()}
          name="gist"
        />
        <Button onClick={UseSelectedGistFile} variant="primary">
          Import Gist File
        </Button>
      </Col>
      <Col>
        <Button variant="success">Create a New File</Button>
        <Button variant="outline-success">Create a New Blank File</Button>
      </Col>
      <Col>
        <Button variant="danger" onClick={reset}>
          Choose a different Gist
        </Button>
      </Col>
    </>
  );
};

export default GistLoaded;
