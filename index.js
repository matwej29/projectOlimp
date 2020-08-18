const express = require("express");
const app = express();

const pagesController = require("./pages.js");
const Pages = new pagesController();

app.get("/", function (req, res) {
  res.send("hello");
});

app.get("/info", Pages.info());

app.listen(3000);
