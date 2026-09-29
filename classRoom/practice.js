const express = require("express");
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { name } = require("ejs");
app.use(cookieParser("secret"));
app.use(session());

// let loggedUser = null;
// app.get("/login", (req, res) => {
//   let { name } = req.query;
//   loggedUser = name;
//   req.session.name = name;
//   console.log(loggedUser);
//   res.send("login successfull");
// });
// app.get("/profile", (req, res) => {
//   if (loggedUser === null) {
//     res.send("Please login first");
//   } else {
//     res.send(`Welcome ${loggedUser}`);
//   }
// });

// app.get("/logout", (req, res) => {
//   loggedUser = null;
//   res.send("Logged out sucessfully");
// });

// let cartItems = [];
// app.get("/addToCart", (req, res) => {
//   let { product } = req.query;
//   cartItems.push(product);
//   console.log(cartItems);
//   res.send("Added sucessfully");
// });

// app.get("/cart", (req, res) => {
//   if (cartItems.length === 0) {
//     res.send("Your cart is empty");
//   } else {
//     res.send(cartItems);
//   }
// });

// app.get("/removeCart", (req, res) => {
//   let { product } = req.query;
//   let val = cartItems.filter((item) => item == product);
//   res.send("Product removed");
// });

//let loggedUser = null;
// let cartItems = [];
// app.get("/dashboard", (req, res) => {
//   if (loggedUser === null) {
//     res.send("please login first");
//   } else {
//     res.send(`Welcome ${loggedUser}, your cart has ${cartItems.length} items`);
//   }
// });
// app.get("/login", (req, res) => {
//   let { name } = req.query;
//   loggedUser = name;
//   console.log(name);
//   res.redirect("/dashboard");
// });
// app.get("/clearCart", (req, res) => {
//   cartItems = [];
//   console.log(cartItems.length);
//   res.send("cart cleared");
// });
// app.get("/logout", (req, res) => {
//   loggedUser = null;
//   cartItems = [];
//   res.send("logged out and cart cleared");
// });

// let loggedUser = null;
// app.get("/login", (req, res) => {
//   let { name } = req.query;
//   loggedUser = name;

//   res.send("login successfull");
// });
// app.get("/profile", (req, res) => {
//   if (loggedUser === null) {
//     res.send("Please login");
//   } else {
//     res.send(`Welcome ${loggedUser}`);
//   }
// });

app.get("/user", (req, res) => {
  let { username, role } = req.query;
  req.session.username = username;
  req.session.role = role;

  if (!req.session.username) {
    res.send(" please login ");
  } else {
    res.send(`Welcome ${req.session.username} role: ${req.session.role}`);
  }
});

app.get("/admin", (req, res) => {
  if (!req.session.username) {
    res.send("please login first");
  } else if (req.session.role != "admin") {
    res.send("Access denied");
  } else {
    res.send(`Welcome ${req.session.username}, this is your dashboard`);
  }
});
app.get("/profile", (req, res) => {
  if (!req.session.username) {
    res.send("Please login");
  } else {
    req.session.lastVisited = "Profile Page";
    res.send(`Welcome ${req.session.username}`);
  }
});

app.get("/lastVisited", (req, res) => {
  if (!req.session.username) {
    res.send("Please login");
  } else if (!req.session.lastVisited) {
    res.send(`You last visited ${req.session.lastVisited}`);
  } else {
    res.send("No previous page found");
  }
});

app.get("/logout", (req, res) => {
  if (!req.session.username) {
    res.send("Please login");
  } else {
    req.session.destroy();
    res.send("logged out");
  }
});
app.listen(port, (req, res) => {
  console.log(`server is listening on port ${port}`);
});
