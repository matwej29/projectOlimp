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

const NewsController = require("./newsController.js");
const newsController = new NewsController();

const TeamsController = require("./teamsController.js");
const teamsController = new TeamsController();

const basicAuth = require("express-basic-auth");

const auth = basicAuth({
  users: { admin: "admin" },
  challenge: true,
  realm: "Imb4T3st4pp",
});

app.get("/", Pages.home);

app.get("/info", Pages.info);

app.get("/home", Pages.home);

app.get("/organizers", Pages.organizers);

app.get("/partners", Pages.partners);

app.get("/help", Pages.help);

app.get("/teams", Pages.teams);

app.get("/admin", auth, adminPages.home);

app.get("/admin/news/add", auth, newsController.getAdd);

app.post("/admin/news/add", auth, newsController.postAdd);

app.get("/admin/news/delete", auth, newsController.delete);

app.get("/admin/news/edit", auth, newsController.getEdit);

app.post("/admin/news/edit", auth, newsController.postEdit);

app.get("/admin/teams", adminPages.teams);

app.get("/admin/teams/edit", auth, teamsController.getEdit);

app.post("/admin/teams/edit", auth, teamsController.postEdit);

app.get("/admin/teams/add", auth, teamsController.getAdd);

app.post("/admin/teams/add", auth, teamsController.postAdd);

app.get("/admin/teams/delete", auth, teamsController.delete);

app.get("/admin/teams/edit", auth, teamsController.getEdit);

app.post("/admin/teams/edit", auth, teamsController.postEdit);

app.listen(3000);