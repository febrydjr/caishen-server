const fs = require("fs").promises;
const db = require("../../../models");
const User = db.user;
const messages = require("../../helpers/messages");

async function uploadAvatar(account, file) {
  try {
    const { id } = account;
    const { path } = file;
    const oldAvatar = await User.findOne({ where: { id } });

    await User.update({ avatar: path }, { where: { id } });

    // if (oldAvatar.avatar) {
    //   await fs.unlink(oldAvatar.avatar);
    // }

    return messages.success("Profile image has been changed");
  } catch (error) {
    throw messages.error(500, error.message);
  }
}

module.exports = uploadAvatar;
