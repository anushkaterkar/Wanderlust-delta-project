
const express = require("express");
const router=express.Router();

//POST
//Index-
router.get("/", (req, res) => {
  res.send("Get for post");
});

//Show-posts
router.get("/:id", (req, res) => {
  res.send("GET for show posts");
});

//Post -posts
router.post("/", (req, res) => {
  res.send("POST for posts");
});

//Delete:posts
router.delete("/:id", (req, res) => {
  res.send("Delete for post ");
});

module.exports=router;