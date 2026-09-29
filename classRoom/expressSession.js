const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

const session = require("express-session");
const flash = require("connect-flash");
const sessionOptions = {
  secret: "mysupersecret",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  // console.log(req.session.name);
  req.flash("success", "User registered successfully");
  res.redirect("/hello");
});
app.get("/hello", (req, res) => {
  // console.log(req.flash("success"));
  res.render("page.ejs", { name: req.session.name, msg: req.flash("success") });
});
//To check how many time req is sent in single session
app.get("/reqcount", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }
  res.send(`You send request ${req.session.count} times`);
});

app.get("/test", (req, res) => {
  res.send("Test successfull");
});
app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
