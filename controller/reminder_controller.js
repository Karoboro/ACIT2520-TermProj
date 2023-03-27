// let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.redirect("/reminders");
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    let searchIndex = req.user.reminders.findIndex((reminder) => reminder.id == req.params.id);
    let reminder = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      completed: JSON.parse(req.body.completed),
    };
    req.user.reminders[searchIndex] = reminder;
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    let searchIndex = req.user.reminders.findIndex((reminder) => reminder.id == req.params.id);
    req.user.reminders.splice(searchIndex, 1);
    for (const [idx, reminder] of req.user.reminders.entries()) {
      reminder.id = idx + 1;
    };
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
