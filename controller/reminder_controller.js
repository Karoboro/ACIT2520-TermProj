const { findOne } = require("../database").userModel

let remindersController = {
  list: (req, res) => {
    const userFromDb = findOne(req.user.email);
    
    // social reminders functionality
    let friendReminders = []
    for (let friend of userFromDb.friends) { // get latest friend data
      let reminders = findOne(friend).reminders // get list of all friend's reminders for each friend in user's friend list
      friendReminders.push(reminders)
    }

    res.render("reminder/index", { reminders: userFromDb.reminders, friends: friendReminders }) // userFromDb.friends }); // NEW: added friends
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

  getFriends: (req, res) => { // add friend screen
    const userFromDb = findOne(req.user.email);
    res.render("reminder/add-friends", { friends: userFromDb.friends });
  },

  addFriends: (req,res) => { // submit friend request
    const friendEmail = req.body.email // stores email input
    
    
    const userFromDb = findOne(req.user.email); // move this variable assignment before try/catch block to show the current user's list of friends on error message page.
        
    try { //[FIXED - Use a try/catch block to handle the findOne function throwing an error] 
      friendFromDb = findOne(friendEmail);

    } catch (errorMessage){
   
      res.render('reminder/add-friend-error', { friends: userFromDb.friends, error: errorMessage }); // render add-render-error page with error message thrown from findOne.
      return
    }
    
    if (!(userFromDb.friends.includes(friendEmail)) && req.user.email != friendEmail) { // check if the friend to be added is not already in friend list and is not the user
      userFromDb.friends.push(friendEmail) // add friend's email to user's friend list
      // Send a confirmation message to reminder/add-friends ejs
      res.render("reminder/add-friends", { friends: userFromDb.friends, confirmation: "Friend successfully added." }); // redirect to add friends page 

    } 
    // Handle friend request to self.
    else if (userFromDb.email === friendEmail) {
      res.render("reminder/add-friend-error", { friends: userFromDb.friends, error: "You should already be friends with yourself."});
    }
      
      //  Handle user adding duplicate friend. Redirects to error page with the error message below.
    else { 
      res.render("reminder/add-friend-error", { friends: userFromDb.friends, error: "This user is already in your Friends list!"});
    }
  }
};

module.exports = remindersController;
