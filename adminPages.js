class Controller {
  home(list, req, res) {
    res.render("homeA", { list: list });
  }
  add(req, res) {
    res.render("addition");
  }

  edit(req, res, tmpid, header) {
    res.render("edit", { tmpid, header });
  }
}

module.exports = Controller;
