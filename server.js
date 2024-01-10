const express = require("express");
const app = express();
const CORS = require("cors");
const { Octokit } = require("octokit");

//please provide auth key in the auth parameter below
const octokit = new Octokit({
  auth: process.env.KEY, //you have to provide the personal authorization key for accessing github api
});

app.use(CORS());

app.use("/repositories/:name/:repo/commit/:id/diff", async (req, res) => {
  // console.log("diff triggers");
  try {
    const response = await octokit.request(
      `GET /repos/${req.params.name}/${req.params.repo}/commits/${req.params.id}`,
      { headers: { Accept: "application/vnd.github.diff" } }
    );
    // console.log(response.data);
    res.json({ data: response });
  } catch (err) {
    // console.log("error", err);
    res.send({ message: err });
  }
});
app.use("/repositories/:name/:repo/commit/:id", async (req, res) => {
  // console.log("normal triggers");
  try {
    const response = await octokit.request(
      `GET /repos/${req.params.name}/${req.params.repo}/commits/${req.params.id}/`
    );
    res.json({ data: response.data });
  } catch (err) {
    console.log("error", err);
    res.send({ message: err });
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(5000, () => {
  console.log("Server Running on the PORT:5000");
});
