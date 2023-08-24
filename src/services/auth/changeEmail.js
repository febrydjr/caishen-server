const path = require("path");
const db = require("../../../models");
const { messages } = require("../../helpers");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const users = db["user"];

async function changeEmail(oldEmail, newEmail) {
  let transaction;
  try {
    const user = await users.findOne({ where: { email: oldEmail } });
    if (!user) {
      return { status: 404, message: "Account not found" };
    }
    const existingUser = await users.findOne({ where: { email: newEmail } });
    if (existingUser && existingUser.id !== user.id) {
      return {
        status: 400,
        message: "Email already associated with another account",
      };
    }
    transaction = await db.sequelize.transaction();
    await user.update({ email: newEmail }, { transaction });
    await transaction.commit();
    return { status: 200, message: "Email changed successfully" };
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
    }
    throw error;
  }
}

module.exports = changeEmail;
