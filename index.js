const express = require("express");
const app = express();
const hbs = require("hbs");

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
const Storage = require("./news.js");
hbs.registerPartials(__dirname + "/views/partials");

app.use("/static", express.static(__dirname + "/static"));

const storage = new Storage();
const pagesController = require("./pages.js");
const Pages = new pagesController();

app.get("/", function (req, res) {
  res.send("hello");
});

app.get("/info", Pages.info());

app.listen(3000);

app.get("/home", (req, res) => {
  temps = storage.news();
  res.render("home", { list: temps });
});

app.post("/add", (req, res) => {
  storage.add(req.body.data);
  res.redirect("/home");
});

app.get("/add", (req, res) => {
  res.render("addition");
});

app.get("/delete", (req, res) => {
  const tmpid = parseInt(req.query.id, 10);
  if (storage.delete(tmpid)) {
    res.redirect("/home");
  } else {
    res.status(404).send("Not found");
  }
});
