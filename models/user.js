const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Defines the username and password
const passportLocalMongoose = require("passport-local-mongoose").default;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});
userSchema.plugin(passportLocalMongoose);//hashing salting and generating username and passwprd
module.exports = mongoose.model("User", userSchema);
