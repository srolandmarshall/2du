const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("ho!"));
app.post("/oauth", async (req, res) => {
  const formData = req.body;
  const URL = `https://github.com/login/oauth/access_token?code=${formData.code}&client_id=${formData.client_id}&client_secret=${formData.client_secret}`;
  try {
    const resp = await axios.post(URL, {
      headers: {
        Accept: "application/json",
      },
    });
    console.log(`Going to ${URL}`);
    console.log("Response:");
    console.log(resp);
    res.json(resp.data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(8080);
console.log("Listening on 8080");
