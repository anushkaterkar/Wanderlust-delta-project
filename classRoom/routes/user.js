const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("I am root");
});

//Index-users
router.get("/", (req, res) => {
  res.send("Get for user");
});

//Show-users
router.get("/:id", (req, res) => {
  res.send("GET for show user");
});

//Post -users
router.post("/", (req, res) => {
  res.send("POST for user");
});

//Delete:users
router.delete("/:id", (req, res) => {
  res.send("Delete for user");
});

module.exports = router;

