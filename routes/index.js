var express      = require("express");
var app          = express();
var router       = express.Router();
var passport     = require("passport");
var User         = require("../models/user");
var middleware   = require("../middleware");

// var nodemailer = require('nodemailer');


// ROOT Route
router.get("/", function(req,res) {
   res.render("landing");
});

// ABOUT Route
router.get("/about", function(req, res) {
   res.render("about");
});

// Work Route (all work index)
router.get("/work", function(req,res) {
   res.render("work");
});

// REGISTER User Form Route
router.get("/register", function(req,res) {
   res.render("register");
});

// LOGIN User Form Route
router.get("/login", function(req, res) {
   res.render("login");
})

// Submit Register User Form Route
router.post("/register", function(req, res) {
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user) {
      if(err) {
         req.flash("error", err.message);
         return res.render("register");
      }
      passport.authenticate("local")(req, res, function() {
         req.flash("success", "Welcome to My Blog " + user.username);
         res.redirect("/blog");
      });
   });
});

//Login Logic Route
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/blog",
        failureRedirect: "/login"
    }), function(req, res) {
});

//Logout Route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/");
});

// ADD FLASH MESSAGES TO MESSAGE FORM
// Submit Message Route




router.post("/about", function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var newMessage = {name: name, email: email, message: message}
  Message.create(newMessageRqst, function(err, newMessage) {
    if(err) {
      console.log(err);
    } else {
      console.log(newMessage);
      res.redirect("/about");
    }
  });
});

// transporter.sendMail(message, (err, info) => {
//     if (err) {
//         console.log('Error occurred. ' + err.message);
//         return process.exit(1);
//     }
//
//     console.log('Message sent: %s', info.messageId);
//     // Preview only available when sending through an Ethereal account
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// });
// });

module.exports = router;
