import React, { useEffect, useState } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import GistPicker from "./GistPicker";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocalStorage } from "../App.js";
import useSessionstorage from "@rooks/use-sessionstorage";

const queryString = require("query-string");
const axios = require("axios").default;

const GitHub = (props) => {
  const [hasGithubToken, setHasGitHubToken] = useState(
    typeof Cookies.get("access_token") !== "undefined"
  );
  const token = Cookies.get("access_token");

  const [gists, setGists] = useLocalStorage("2du:gists", []);
  const [selectedGist, setSelectedGist] = useState(gists[0]);
  const [gist, setGist, removeGist] = useSessionstorage("2du:gist", {});

  const { exportAllToJSON } = props;

  const useSelectedGist = () => {
    console.log(`Use this Gist: ${selectedGist}`);
    debugger;
    setGist(selectedGist);
  };

  const useLocalGistSelection = () => {
    const gistId = window.localStorage.getItem("2du:selected-gist");
    setSelectedGist(gists.find((gist) => gist.id === gistId));
  };

  useEffect(() => {
    const queries = window.location.search;
    const params = new URLSearchParams(queries);
    const code = params.get("code");
    if (code && !hasGithubToken) {
      async function getToken() {
        try {
          const res = await axios.post(
            `/oauth`,
            {
              client_id: process.env.REACT_APP_CLIENT_ID,
              client_secret: process.env.REACT_APP_CLIENT_SECRET,
              code: code,
              scope: "gists",
            },
            { headers: { Accept: "application/json" } }
          );

          const parsed = queryString.parse(res.data);
          if (parsed.error) {
            throw parsed.error;
          } else {
            for (let [key, value] of Object.entries(parsed)) {
              Cookies.set(key, value);
            }
            setHasGitHubToken(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getToken();
    }
  });

  useEffect(() => {
    async function getGists() {
      try {
        console.log("Getting gists...");

        const res = await axios.post(
          `/gists`,
          { token: token },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        if (res.error) {
          throw res.error;
        } else {
          setGists(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getGists();
  }, []);

  const newGist = async () => {
    const today = new Date();
    const gistBody = {
      description: "2du",
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
        setGist(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!hasGithubToken ? (
        <a
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=gist&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}
        >
          <Button variant="secondary">
            <span className="padded">Log In with GitHub</span>
            <FontAwesomeIcon icon={["fbb", "github"]} />
          </Button>
        </a>
      ) : (
        <Card style={{ width: "100%" }}>
          <Card.Header as="h5">Logged in via GitHub</Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>Choose your 2du Gist</Card.Title>
                <GistPicker
                  setSelectedGist={setSelectedGist}
                  gists={gists}
                  className="padded"
                />
                <Button variant="primary" onClick={useSelectedGist}>
                  Use This Gist
                </Button>
              </Col>
              <Col>Or...</Col>
              <Col>
                <Button variant="success" onClick={newGist}>
                  Create New 2du Gist
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default GitHub;
