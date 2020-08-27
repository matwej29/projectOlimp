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
  res.redirect("/home");
});

app.get("/info", Pages.info);

app.get("/home", async (req, res) => {
  let temps = await storage.news();
  Pages.home(temps, req, res);
});

app.post("/add", (req, res) => {
  storage.add(req.body.header, req.body.text);
  res.redirect("/home");
});

app.get("/add", Pages.add);

app.get("/delete", (req, res) => {
  const tmpid = parseInt(req.query.id.toString(), 10);
  if (!storage.delete(tmpid)) {
    Pages.status404(res);
  }
  Pages.redirectToHome(res);
});

app.get("/edit", async (req, res) => {
  const tmpid = parseInt(req.query.id.toString(), 10);
  const item = await storage.itemById(tmpid);
  const header = await item.header;
  Pages.edit(req, res, tmpid, header);
});

app.post("/edition", (req, res) => {
  const tmpid = parseInt(req.query.id.toString(), 10);
  const value = req.body.text;
  if (!storage.edit(tmpid, value)) {
    Pages.status404(res);
  }
  Pages.redirectToHome(res);
});

app.get("/organizers", (req, res) => {
  Pages.organizers(req, res);
});

app.get("/partners", (req, res) => {
  Pages.partners(req, res);
});

app.listen(3000);

const basicAuth = require("express-basic-auth");

const auth = basicAuth({
  users: { admin: "admin" },
  challenge: true,
});
