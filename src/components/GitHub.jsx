import React, { useEffect, useState } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocalStorage, token } from "../App.js";
import useSessionstorage from "@rooks/use-sessionstorage";
import NoGist from "./NoGist.jsx";
import GistLoaded from "./GistLoaded.jsx";

//TODO:
// * Allow user to clear Gist
// * Get all files from Gist
// * Allow user to select file to load
// * Create compatible file check
// * Allow user to create new file from initialState (with title form)
// * Allow user to create new file from current 2du state (with title form)
// * Allow user to sync 2du/overwrite selected file (with warning)
// * Create warning

const queryString = require("query-string");
const axios = require("axios").default;

const GitHub = (props) => {
  const { setShowClearModal, setTempToDoList, setToDoList, toDoList } = props;
  const [hasGithubToken, setHasGitHubToken] = useState(
    typeof Cookies.get("access_token") !== "undefined"
  );

  const [gists, setGists] = useSessionstorage("2du:gists", []);
  const [selectedGist, setSelectedGist] = useState({});
  const [gist, setGist, removeGist] = useSessionstorage("2du:gist", {});
  const [hasGist, setHasGist] = useState(false);
  const [gistFile, setGistFile, removeGistFile] = useSessionstorage(
    "2du:gist-file",
    {}
  );
  const [gistFiles, setGistFiles] = useSessionstorage("2du:gist-files", {});

  const resetGist = () => {
    setGist({});
    setHasGist(false);
  };

  const useGist = (gist) => {
    setGist(gist);
    setGistFiles(gist["files"]);
    setHasGist(true);
  };

  const useGistFile = (file) => {
    const content = file["content"];
    const parsed = JSON.parse(content);
    setGistFile(content);
    debugger;
    if (parsed["2du"]) {
      window.localStorage.clear();
      debugger;
      for (let [key, value] of Object.entries(parsed["2du"])) {
        window.localStorage.setItem(key, value);
      }
      const data = parsed["2du"];
      const toDos = JSON.parse(data["2du:toDos"]);
      debugger;
      if (toDoList.length > 0) {
        setShowClearModal(true);
        setTempToDoList(toDos);
      } else {
        setToDoList(toDos);
      }
    }
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
  }, [hasGithubToken]);

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
              {hasGist ? (
                <GistLoaded
                  reset={resetGist}
                  useGistFile={useGistFile}
                  gist={gist}
                  gistFiles={gistFiles}
                  setGistFiles={setGistFiles}
                />
              ) : (
                <NoGist
                  gists={gists}
                  useGist={useGist}
                  selectedGist={selectedGist}
                  setSelectedGist={setSelectedGist}
                />
              )}
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default GitHub;
