const { findOne } = require("../database").userModel

let remindersController = {
  list: (req, res) => {
    const userFromDb = findOne(req.user.email);
    res.render("reminder/index", { reminders: userFromDb.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    const userFromDb = findOne(req.user.email);
    let searchResult = userFromDb.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.redirect("/reminders");
    }
  },

  create: (req, res) => {
    const userFromDb = findOne(req.user.email);
    let reminder = {
      id: userFromDb.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      tags: req.body.tags ? [].concat(req.body.tags).filter(el => el) : [],
      subtasks: req.body.subtasks ? [].concat(req.body.subtasks).filter(el => el) : [],
      due_date: req.body.due_date,
    };
    userFromDb.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    const userFromDb = findOne(req.user.email);
    let reminderToFind = req.params.id;
    let searchResult = userFromDb.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    const userFromDb = findOne(req.user.email);
    let searchIndex = userFromDb.reminders.findIndex((reminder) => reminder.id == req.params.id);
    let reminder = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      completed: JSON.parse(req.body.completed),
      tags: req.body.tags ? [].concat(req.body.tags).filter(el => el) : [],
      subtasks: req.body.subtasks ? [].concat(req.body.subtasks).filter(el => el) : [],
      due_date: req.body.due_date,
    };
    req.user.reminders[searchIndex] = reminder;
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // Implement this code
    const userFromDb = findOne(req.user.email);
    let searchIndex = userFromDb.reminders.findIndex((reminder) => reminder.id == req.params.id);
    userFromDb.reminders.splice(searchIndex, 1);
    req.user.reminders.forEach((reminder, idx) => {
      reminder.id = idx + 1 ;
    });
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
