const path = require("path");
const messages = require("../../helpers/messages");
const bcrypt = require("bcrypt");
require("dotenv").config({
  path: path.resolve("../../../.env"),
});
const { Op } = require("sequelize");
const db = require("../../../models");
const User = db.user;

async function createUser(name, username, email, phone, password) {
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      throw new Error("Username or email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      username,
      email,
      phone,
      password: hashedPassword,
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error.message);
  }
}

async function register(name, username, email, phone, password) {
  try {
    const newUser = await createUser(name, username, email, phone, password);
    return messages.success("Registration successful");
  } catch (error) {
    console.error("Error during registration:", error);
    return messages.error(500, error.message);
  }
}

module.exports = register;
