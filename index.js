const express = require("express");
const app = express();
const Storage = require("./News Storage.js");
const hbs = require("hbs");

app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");

hbs.registerPartials(__dirname + "/views/partials");

app.use("/static", express.static(__dirname + "/static"));

const storage = new Storage();

app.listen(3000);

app.get("/home", (req, res) => {
  temps = storage.getList();
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
