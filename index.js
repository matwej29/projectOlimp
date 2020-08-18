const express = require("express");
const hbs = require("express-handlebars");
const app = express();
const Storage = require("./News Storage.js");

app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultView: "",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.use("/static", express.static(__dirname + "/static"));

const storage = new Storage();

app.listen(3000);

app.get("/", function (req, res) {
  res.send("hello");
});

app.get("/home", (req, res) => {
  temps = storage.getList();
  res.render("home", { list: temps });
});

app.get("/add", (req, res) => {
  storage.add(req.body.data);
  res.redirect("/home");
});

app.get("/delete", (req, res) => {
  const tmpid = parseInt(req.query.id, 10);
  if (storage.delete) {
    res.redirect("/home");
  } else {
    res.status(404).send("Not found");
  }
});
