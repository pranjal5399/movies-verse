require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const mongoSanitize = require("express-mongo-sanitize");
const MongoStore = require("connect-mongo");

const User = require("./models/user");
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URL, {
  useUnifiedTopology: true,
});

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(mongoSanitize());
app.use(flash());

// PASSPORT CONFIG
app.use(
  session({
    secret: "shibas are the best dogs in the world.",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URL }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.session = req.session;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.set("view engine", "ejs");

const userRoutes = require("./routes/user.routes");
const movieRoutes = require("./routes/movies.routes");
const listRoutes = require("./routes/list.routes");

app.use("/", userRoutes);
app.use("/movies", movieRoutes);
app.use("/lists", listRoutes);

app.get("*", function (req, res) {
  return res.render("error");
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
