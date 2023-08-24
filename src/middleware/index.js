const validator = require("./validator");
const multer = require("./multer");
const auth = require("./auth");
const isAdmin = require("./isAdmin");

module.exports = {
  auth,
  multer,
  validator,
  isAdmin,
};
