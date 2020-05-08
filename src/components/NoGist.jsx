import React from "react";
import { Col, Button, Card } from "react-bootstrap";
import GistPicker from "./GistPicker";
import { exportAllToJSON, token } from "../App.js";

const NoGist = (props) => {
  const { useGist, selectedGist, setSelectedGist, gists } = props;
  const axios = require("axios").default;

  const getGistFromGitHub = async (id) => {
    try {
      const res = await axios.post(
        `/get-gist`,
        { token: token, gistId: id },
        {
          headers: { Accept: "application/json" },
        }
      );
      if (res.error) {
        throw res.error;
      } else {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const UseSelectedGist = async () => {
    console.log(`Use this Gist: ${selectedGist["id"]}`);
    let gist = {};
    try {
      gist = await getGistFromGitHub(selectedGist["id"]);
    } catch (error) {
      console.log(error);
    }
    useGist(gist);
  };

  const newGist = async () => {
    const today = new Date();
    const gistBody = {
      description: `2du - ${today.toLocaleDateString()}`,
      //TODO: Make above a string that is input by user
      public: false,
      files: {
        [`${today.toJSON()}.json`]: {
          content: exportAllToJSON(),
        },
      },
    };
    try {
      const res = await axios.post(
        `/new-gist`,
        { token: token, gist: gistBody },
        {
          headers: { Accept: "application/json" },
        }
      );
      if (res.error) {
        throw res.error;
      } else {
        UseSelectedGist(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Col>
        <Card.Title>Choose your 2du Gist</Card.Title>
        <GistPicker
          setSelectedGist={setSelectedGist}
          gists={gists}
          className="padded"
        />
        <Button variant="primary" onClick={UseSelectedGist}>
          Use This Gist
        </Button>
      </Col>
      <Col>Or...</Col>
      <Col>
        <Button variant="success" onClick={newGist}>
          Create New 2du Gist
        </Button>
      </Col>
    </>
  );
};

export default NoGist;
