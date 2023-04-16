const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

const passport = require("./middleware/passport");
const session = require("express-session");
const { forwardAuthenticated, ensureAuthenticated } = require("./middleware/checkAuth");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());


// app.locals.user = undefined;
app.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user
  } else {
    res.locals.user = undefined;
  }
  next();
})

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Routes start here

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login);
app.get("/logout", authController.logout);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

// add friends
app.get("/addfriends", reminderController.getFriends)
app.post("/addfriends", reminderController.addFriends)

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
