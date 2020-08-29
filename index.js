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
  let temps = await storage.news();
  temps.forEach(async (element) => {
    element.text = marked(element.text);
  });
  adminPages.home(temps, req, res);
});

app.get("/info", Pages.info);

app.get("/home", async (req, res) => {
  let temps = await storage.news();
  temps.forEach(async (element) => {
    element.text = marked(element.text);
  });
  Pages.home(temps, req, res);
});

app.get("/add", auth, adminPages.add);

app.post("/add", auth, async (req, res) => {
  if (req.auth === undefined) {
    res.send("404");
    console.log(req.auth);
  }
  if (!storage.add(req.body.header, req.body.text)) {
    res.redirect("/admin");
  } else {
    res.send("404");
  }
});

app.get("/delete", auth, (req, res) => {
  if (req.auth === undefined) {
    res.send("404");
    console.log(req.auth);
  }
  const tmpid = parseInt(req.query.id.toString(), 10);
  if (!storage.delete(tmpid)) {
    Pages.status404(res);
  }
  res.redirect("/admin");
});

app.get("/edit", auth, async (req, res) => {
  if (req.auth === undefined) {
    res.send("404");
    console.log(req.auth);
  }
  try {
    const tmpid = parseInt(req.query.id.toString(), 10);
    const item = await storage.itemById(tmpid);
    const header = await item.header;
    adminPages.edit(req, res, tmpid, header);
    res.redirect("/admin");
  } catch {
    res.send("404");
  }
});

app.post("/edition", auth, (req, res) => {
  if (req.auth === undefined) {
    res.send("404");
    console.log(req.auth);
  }
  const tmpid = parseInt(req.query.id.toString(), 10);
  const value = req.body.text;
  if (!storage.edit(tmpid, value) & req.auth) {
    Pages.status404(res);
  }
  res.redirect("/admin");
});

app.get("/organizers", Pages.organizers);

app.get("/partners", Pages.partners);

app.listen(3000);
