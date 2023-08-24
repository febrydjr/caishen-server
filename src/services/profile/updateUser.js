const db = require("../../../models");
const User = db.user;
const messages = require("../../helpers/messages");

async function updateUser(id, username, email) {
  const t = await db.sequelize.transaction();
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw messages.error(404, "User not found");
    }
    if (id) {
      user.id = id;
    }
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    await user.save({ transaction: t });
    await t.commit();
    return messages.success("Berhasil Diubah");
  } catch (error) {
    await t.rollback();
    throw messages.error(500, error.message);
  }
}

module.exports = updateUser;
