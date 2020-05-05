import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import DropDown from "./DropDown";
import Cookies from "js-cookie";
import { useLocalStorage } from "../App.js";

const queryString = require("query-string");
const axios = require("axios").default;

const GitHub = () => {
  const [gists, setGists] = useLocalStorage("2du:gists", []);
  useEffect(() => {
    async function getGists() {
      try {
        console.log("Getting gists...");

        const token = Cookies.get("access_token");
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
  const gistDescs = gists.map((gist) => gist.description);
  return (
    <>
      <Card>
        <Card.Header as="h5">Logged in via GitHub</Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <DropDown options={gistDescs} />;
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default GitHub;
