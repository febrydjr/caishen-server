const db = require("../../../models");
const User = db.user;
const messages = require("../../helpers/messages");

async function getAllUsers() {
  try {
    const users = await User.findAll({ where: { is_admin: 0 } });
    return messages.success("Cashier List!", users);
  } catch (error) {
    throw messages.error(500, error.message);
  }
}

module.exports = getAllUsers;
