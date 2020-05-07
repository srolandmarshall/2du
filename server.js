const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("ho!"));

app.post("/gists", async (req, res) => {
  const formData = req.body;
  const URL = `https://api.github.com/gists`;
  try {
    const resp = await axios.get(URL, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${formData.token}`,
      },
    });
    console.log("Response:");
    console.log(resp);
    res.json(resp.data);
  } catch (error) {
    console.error(error);
  }
});

app.post("/new-gist", async (req, res) => {
  const URL = `https://api.github.com/gists`;
  try {
    const resp = await axios.post(URL, req.body.gist, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.body.token}`,
      },
    });
    res.json(resp.data);
  } catch (error) {
    console.error(error);
  }
});

app.post("/oauth", async (req, res) => {
  console.log("Attempting OAuth");

  const formData = req.body;
  const URL = `https://github.com/login/oauth/access_token?code=${formData.code}&scope=gist&client_id=${formData.client_id}&client_secret=${formData.client_secret}`;
  try {
    const resp = await axios.post(URL, {
      headers: {
        Accept: "application/json",
      },
    });
    res.json(resp.data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(8080);
console.log("Listening on 8080");
