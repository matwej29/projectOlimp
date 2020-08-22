const express = require("express");
const app = express();
const hbs = require("hbs");

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");

app.use("/static", express.static(__dirname + "/static"));

const pagesController = require("./pages.js");
const Pages = new pagesController();

const Storage = require("./news.js");
const storage = new Storage();

app.get("/", function (req, res) {
  res.send("hello");
});

app.get("/info", Pages.info);

app.get("/home", async (req, res) => {
  let temps = await storage.news();
  res.render("home", { list: temps });
});

app.post("/add", (req, res) => {
  storage.add(req.body.header, req.body.text);
  res.redirect("/home");
});

app.get("/add", (req, res) => {
  res.render("addition");
});

app.get("/delete", (req, res) => {
  const tmpid = parseInt(req.query.id.toString(), 10);
  if (!storage.delete(tmpid)) {
    res.status(404).send("Not found");
  }
  res.redirect("/home");
});

app.listen(3000);
