const path = require("path");
const db = require("../../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { messages } = require("../../helpers");
require("dotenv").config({
    path: path.resolve(__dirname, "../../../.env"),
});

const KEY_JWT = process.env.JWT_KEY;
const users = db["user"];

async function getAccount(id) {
    return await users.findOne({ where: { id } });
}

async function hashPass(password) {
    const salt = await bcrypt.genSalt(10);
    console.log("HASH PASS", password, salt);
    return await bcrypt.hash(password, salt);
}

async function resetPassword(token, password) {
    let account = jwt.verify(token, KEY_JWT);
    account = await getAccount(account["id"]);

    const hashPassword = await hashPass(password);

    return await db.sequelize.transaction(async function (t) {
        await users.update(
            { password: hashPassword },
            { where: { id: account["id"] }, transaction: t }
        );
        return messages.success("Success to change your password");
    });
}

module.exports = resetPassword;
