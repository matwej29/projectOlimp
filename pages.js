class Controller {
  info(req, res) {
    res.render("info");
  }
  add(req, res) {
    res.render("addition");
  }

  home(list, req, res) {
    res.render("home", { list: list });
  }
}

module.exports = Controller;
