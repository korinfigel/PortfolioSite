var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var nodemailer = require("nodemailer");

var messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});


module.exports = mongoose.model("Message", messageSchema);
