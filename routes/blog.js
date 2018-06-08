var express      = require("express");
var router       = express.Router();
var passport     = require("passport");
var app          = express();
var User         = require("../models/user");
var Blog         = require("../models/blogPost");
var middleware   = require("../middleware");


// INDEX ROUTE- show all blog posts
router.get("/", function(req, res) {
    //get all posts from db
    Blog.find({}, function(err, allBlogPosts) {
       if(err) {
          console.log(err);
       } else {
          res.render("blog/index", {blog: allBlogPosts});
       }
    });
});

//CREATE NEW BLOG FORM ROUTE
router.get("/new", function(req, res) {
   res.render("blog/new");
});

//NEW BLOG POST ROUTE
router.post("/", function(req, res) {
   var date = new Date();
   var title = req.body.title;
   var content = req.body.content;
   var newBlogPost = {date: date, title: title, content: content}
   Blog.create(newBlogPost, function(err, newPost) {
      if(err) {
          console.log(err);
      } else {
          console.log(newPost);
          res.redirect("/blog");
      }
   });
});

module.exports = router;
