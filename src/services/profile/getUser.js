const db = require("../../../models");
const User = db.user;
const messages = require("../../helpers/messages");

async function getUser(account) {
  try {
    const users = await User.findOne({ where: { id: account.id } });
    return messages.success("Users found", users);
  } catch (error) {
    throw messages.error(500, "Failed to get users");
  }
}

module.exports = getUser;
