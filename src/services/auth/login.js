const path = require("path");
const messages = require("../../helpers/messages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: path.resolve("../../../.env"),
});

const db = require("../../../models");
const { Op } = require("sequelize");
const User = db.user;

async function findUser(identifier, password) {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ username: identifier }, { email: identifier }],
    },
  });

  return user;
}

function generateToken(session) {
  try {
    return jwt.sign(session, process.env.JWT_KEY, { expiresIn: "12h" });
  } catch (error) {
    throw new Error("Error generating token");
  }
}

async function login(identifier, password) {
  try {
    const account = await findUser(identifier, password);
    if (!account) return messages.error(500 ,"user not found");

    const passwordMatch = await bcrypt.compare(password, account.password);
    if (!passwordMatch) return messages.error(400, "username/email atau password salah");

    const payload = { id: account.id, is_admin: account.is_admin };
    const token = generateToken(payload);
    return messages.success("Login Success", { token });
  } catch (error) {
    console.error("Error during login:", error);
    return messages.error(500, error.message);
  }
}

module.exports = login;
