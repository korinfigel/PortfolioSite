var mongoose = require("mongoose");
var User     = require("./models/user");
var Blog     = require("./models/blogPost")

// Seed Info for Users

var data = [
    {
        username: "admin", password: "admin", isAdmin: true,
    },
    {
        username: "misskorin", password: "password", isAdmin: true
    },
    {
        username: "steve", password: "password", isAdmin: false
    }
    ]

function seedDB() {
    //remove all users
    User.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("REMOVED ALL USERS!!");
        //add admin users
        data.forEach(function(seed) {
           User.create(seed, function(err, user) {
               if(err) {
                   console.log(err);
               } else {
                   console.log("Added new user");
                   user.save();
               }
           });
        });
    });
}

// end seed info for users

// Seed Info For Blog Posts

var dataBlog = [
    {
        date: "12/12/1999", title: "seed dataBlog test", content: "test dataBlog content"
    },
    {
        date: "10/11/1987", title: "more seed test data", content: "more seed test data content"
    }
    ]

function seedBlogDB() {
    //remove all blog posts
    Blog.remove({}, function(err) {
       if(err) {
           console.log(err);
       }
       console.log("REMOVED ALL BLOG POSTS");
    //   add blog posts
    dataBlog.forEach(function(seed) {
       Blog.create(seed, function(err, post) {
          if(err) {
              console.log(err);
          } else {
              console.log("Added new Blog Post");
              post.save();
          }
       });
    });
    });
}

module.exports = seedDB;
