const Storage = require("./news.js");
const storage = new Storage();

class Controller {
  getAdd(req, res) {
    res.render("addition", {
      inputName: "header",
      areaName: "text",
      action: "/admin/news/add",
    });
  }

  postAdd(req, res) {
    storage.add(req.body.header, req.body.text);
    res.redirect("/admin");
  }

  delete(req, res) {
    storage.delete(req.query.id);
    res.redirect("/admin");
  }

  async getEdit(req, res) {
    const item = await storage.itemById(req.query.id);
    res.render("edit", {
      action: `/admin/news/edit?id=${req.query.id}`,
      firstValue: item.header,
      secondValue: item.text,
      inputName: "header",
      areaName: "text",
    });
  }

  postEdit(req, res) {
    storage.edit(req.query.id, req.body);
    res.redirect("/admin");
  }
}

module.exports = Controller;
