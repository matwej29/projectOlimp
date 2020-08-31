const marked = require("marked");

const BDteam = require("./teams.js");
const dbTeam = new BDteam();

const Storage = require("./news.js");
const storage = new Storage();

class Controller {
  info(req, res) {
    res.render("info", {style_info: "active-button"});
  }

  async home(req, res) {
    let templist = await storage.news();
    templist.sort(function (a, b) {
      return a.id - b.id;
    });
    templist.forEach(async (element) => {
      element.text = marked(element.text);
      let s = element.date.toString();
      element.date = (s[8]+s[9]+"."+s[5]+s[6]+"."+s[2]+s[3]).toString();
    });
    res.render("home", { list: templist, style_home: "active-button"});
  }

  status404(res) {
    res.status(404).send("Not found");
  }

  organizers(req, res) {
    res.render("organizers", {style_org: "active-button"});
  }

  partners(req, res) {
    res.render("partners", {style_part: "active-button"});
  }

  help(req, res) {
    res.render("help", {style_help: "active-button"});
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
    res.render("teams", { list: templist, style_teams: "active-button"});
  }
}

module.exports = Controller;
