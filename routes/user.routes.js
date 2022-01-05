const express = require("express");
const router = express.Router();
const passport = require("passport");
const List = require("../models/list");
const { postSignup, getHome } = require("../controllers/user.controller");

router.get("/", getHome);

router.get("/register", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  } else {
    return res.render("register");
  }
});

router.post("/register", postSignup);

router.get("/login", (req, res) => {
  try {
    if (req.user) {
      return res.redirect("/");
    } else {
      res.render("login");
    }
  } catch (error) {
    req.flash("error", err.message);
    return res.redirect("/login");
  }
});

// handle login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);

// logout route
router.get("/logout", function (req, res) {
  try {
    req.logout();
    return res.redirect("/");
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
});

module.exports = router;
