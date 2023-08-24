const getUser = require("./getUser");
const uploadAvatar = require("./uploadAvatar");
const getAllUsers = require("./getAllUser");
const deleteUserByUsername = require("./deleteUser");
const updateUser = require("./updateUser");
const activateUserByUsername = require("./activateUser");

module.exports = {
  getUser,
  uploadAvatar,
  getAllUsers,
  deleteUserByUsername,
  activateUserByUsername,
  updateUser,
};
