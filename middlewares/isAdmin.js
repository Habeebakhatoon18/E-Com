const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      req.flash("error", "Please login as admin first");
      return res.redirect("/admin/login");
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      req.flash("error", "Unauthorized access");
      return res.redirect("/admin/login");
    }

    req.admin = admin;
    next();
  } catch (err) {
    req.flash("error", "Invalid or expired session");
    res.redirect("/admin/login");
  }
};
