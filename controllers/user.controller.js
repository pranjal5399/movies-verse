const User = require("../models/user");
const List = require("../models/list");
const middleware = require("../middleware");

exports.getHome = async (req, res) => {
  try {
    const user = req.user;

    if (!user) return res.render("home");

    const lists = await List.find({ username: user._id });
    console.log(lists);
    return res.render("home", { lists });
  } catch (err) {
    console.log(err.message);
  }
};

exports.postSignup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      req.flash("error", "User already exists!");
      return res.redirect("/register");
    }

    const newUser = new User({ username: email, email, fullName });

    const user = await User.register(newUser, password);

    if (!user) {
      req.flash("error", "Signup failed!");
      return res.redirect("/register");
    }

    req.flash("success", "Signup successful! Please login");

    return res.redirect("/login");
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/register");
  }
};
