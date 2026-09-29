// if (process.env.NODE_ENV != "production") {
//   require("dotenv").config();
// }
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");

//Models
const Listing = require("./models/listings.js");
const Review = require("./models/review.js");

const methodOverride = require("method-override");
const port = 8080;

//For validation:-JOI
const { listingSchema, reviewSchema } = require("./schema.js");

//EJS MATE
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//static files:->CSS,JS
app.use(express.static(path.join(__dirname, "/public")));

//Error handling->async & custom express error
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/expressError.js");
const listing = require("./models/listings.js");

//Router
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

//Passport
const passport = require("passport");
const LocalStratergy = require("passport-local"); //Stratergy
const User = require("./models/user.js");
const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error", (err) => {
  console.log("ERROR in mongo session store", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

//Passport
app.use(passport.initialize()); //initalize passport of each request

app.use(passport.session()); //user should login once when browsing same website
passport.use(new LocalStratergy(User.authenticate())); //Default method added by mongoose

passport.serializeUser(User.serializeUser()); //Store users info in session
passport.deserializeUser(User.deserializeUser()); //Remove users info from session

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//Demo User
// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student",
//   });

//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
// Custom Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong!" } = err;
  res.render("./listings/error.ejs", { err });
  // res.status(status).send(message);
});

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
