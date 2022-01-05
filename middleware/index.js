const List = require("../models/list");
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("error", "You need to login first!");
    return res.redirect("/login");
  }
};

const isAuthorized = async (req, res, next) => {
  const { listID } = req.params;
  const list = await List.findByIdAndUpdate(listID);
  const s1 = list && list.username.toString(),
    s2 = req.user._id.toString();
  if (s1 == s2) {
    next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};
module.exports = { isLoggedIn, isAuthorized };
