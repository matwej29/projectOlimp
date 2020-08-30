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

const adminController = require("./adminPages.js");
const adminPages = new adminController();

const Storage = require("./news.js");
const storage = new Storage();

const marked = require("marked");

const basicAuth = require("express-basic-auth");

const auth = basicAuth({
  users: { admin: "admin" },
  challenge: true,
  realm: "Imb4T3st4pp",
});

app.get("/", function (req, res) {
  res.redirect("/home");
});

app.get("/admin", auth, async (req, res) => {
  let templist = await storage.news();
  templist.sort(function (a, b) {
    return a.id - b.id;
  });
  templist.forEach(async (element) => {
    element.text = marked(element.text);
  });
  adminPages.home(templist, req, res);
});

app.get("/info", Pages.info);

app.get("/home", async (req, res) => {
  let templist = await storage.news();
  templist.sort(function (a, b) {
    return a.id - b.id;
  });
  templist.forEach(async (element) => {
    element.text = marked(element.text);
  });
  Pages.home(templist, req, res);
});

app.get("/add", auth, adminPages.add);

app.post("/add", auth, async (req, res) => {
  storage.add(req.body.header, req.body.text);
  res.redirect("/admin");
});

app.get("/delete", auth, (req, res) => {
  storage.delete(req.query.id);
  res.redirect("/admin");
});

app.get("/edit", auth, async (req, res) => {
  const item = await storage.itemById(req.query.id);
  adminPages.edit(req, res, item);
});

app.post("/edition", auth, (req, res) => {
  storage.edit(req.query.id, req.body);
  res.redirect("/admin");
});

app.get("/organizers", Pages.organizers);

app.get("/partners", Pages.partners);

app.listen(3000);
