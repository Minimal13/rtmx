require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

const renderApp = require("./app.js");

const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/todo", (req, res) => {
  res.send(renderApp());
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
