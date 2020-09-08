const marked = require("marked");

const BDteam = require("./teams.js");
const dbTeam = new BDteam();

const Storage = require("./news.js");
const storage = new Storage();

const DateForm = require("./dateForm");
const dateForm = new DateForm();

class Controller {
  info(req, res) {
    res.render("info", { style_info: "active-button", page_name: "Положение" });
  }

  async home(req, res) {
    let templist = await storage.news();
    templist.sort(function (a, b) {
      return a.id - b.id;
    });
    templist.forEach(async (element) => {
      element.text = marked(element.text);
      let s = element.date.toString();
      element.date = dateForm.formatDate(s);
    });
    res.render("home", {
      list: templist,
      style_home: "active-button",
      page_name: "Новости",
    });
  }

  status404(res) {
    res.status(404).send("Not found");
  }

  organizers(req, res) {
    res.render("organizers", {
      style_org: "active-button",
      page_name: "Организаторы",
    });
  }

  partners(req, res) {
    res.render("partners", {
      style_part: "active-button",
      page_name: "Партнеры",
    });
  }

  help(req, res) {
    res.render("help", { 
      style_help: "active-button",
      page_name: "Помощь"
    });
  }

  async teams(req, res) {
    let templist = await dbTeam.teams();
    templist.sort(function (a, b) {
      return a.id - b.id;
    });
    templist.forEach(async (element) => {
      element.description = null ? "" : element.description;
      element.description = marked(element.description);
    });
    res.render("teams", {
      list: templist,
      style_teams: "active-button",
      page_name: "Команды",
    });
  }
}

module.exports = Controller;
