var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var date = new Date();

var blogSchema = new mongoose.Schema({
   date: { type: Date, default: Date.now },
   // toDateString
   title: String,
   content: String
});

module.exports = mongoose.model("Blog", blogSchema);
