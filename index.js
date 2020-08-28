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

const basicAuth = require("express-basic-auth");

const auth = basicAuth({
  users: { admin: "admin32" },
  challenge: true,
  realm: "Imb4T3st4pp",
});

app.get("/", function (req, res) {
  res.redirect("/home");
});

app.get("/admin", auth, async (req, res) => {
  let temps = await storage.news();
  adminPages.home(temps, req, res);
});

app.get("/info", Pages.info);

app.get("/home", async (req, res) => {
  let temps = await storage.news();
  Pages.home(temps, req, res);
});

app.get("/add", adminPages.add);

app.post("/add", async (req, res) => {
  if (
    (await (req.auth != undefined)) &
    !storage.add(req.body.header, req.body.text)
  ) {
    res.redirect("/admin");
  } else {
    res.send("404");
  }
});

app.get("/delete", (req, res) => {
  const tmpid = parseInt(req.query.id.toString(), 10);
  if (!storage.delete(tmpid)) {
    Pages.status404(res);
  }
  res.redirect("/admin");
});

app.get("/edit", async (req, res) => {
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

app.post("/edition", (req, res) => {
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
