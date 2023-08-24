const path = require("path");
const db = require("../../../models");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const users = db["user"];

async function changeUsername(oldUsername, newUsername) {
  let transaction;
  try {
    const user = await users.findOne({ where: { username: oldUsername } });
    if (!user) {
      return { status: 404, message: "Account not found" };
    }
    const existingUser = await users.findOne({
      where: { username: newUsername },
    });
    if (existingUser) {
      return { status: 400, message: "New username already exists" };
    }
    transaction = await db.sequelize.transaction();
    await user.update({ username: newUsername }, { transaction });
    await transaction.commit();
    return { status: 200, message: "Username changed successfully" };
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
}

module.exports = changeUsername;
