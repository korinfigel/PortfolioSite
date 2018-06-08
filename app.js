var express               = require("express"),
    http                  = require("http"),
    app                   = express(),
    server                = http.createServer(app),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    flash                 = require("connect-flash"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    methodOverride        = require("method-override"),
    // nodemailer            = require("nodemailer"),
    User                  = require("./models/user"),
    Blog                  = require("./models/blogPost"),
    date                  = new Date(),
    seedDB                = require("./seeds");




// Requiring Routes
var indexRoutes = require("./routes/index"),
    blogRoutes  = require("./routes/blog");

// FIX DATABASE INFO
mongoose.connect('mongodb://localhost/PortfolioSite');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// Seed The Database
// seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "korin is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/blog", blogRoutes);




// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1337/');
// http://localhost:1337/

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("server started");
});

// app.listen(1337, '127.0.0.1', function() {
//   console.log("server started");
// });
