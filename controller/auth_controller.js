let database = require("../database");
const passport = require("../middleware/passport");

let authController = {
  login: (req, res) => {
    res.render("auth/login", { error: req.session.messages });
  },
  
  register: (req, res) => {
    res.render("auth/register");
  },
  
  loginSubmit: passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
    failureMessage: true
  }),

  registerSubmit: (req, res) => {
    // implement
  },

  logout: (req, res) => {
    req.logout(() => {
      res.redirect("/login");
    });
  },
};

module.exports = authController;
