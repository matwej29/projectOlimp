class Controller {
  home(list, req, res) {
    res.render("homeA", { list: list });
  }
  add(req, res) {
    res.render("addition");
  }

  edit(req, res, item) {
    res.render("edit", { item });
  }
}

module.exports = Controller;
