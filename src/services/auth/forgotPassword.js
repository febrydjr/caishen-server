const path = require("path");
const { messages, sendMail } = require("../../helpers");
const jwt = require("jsonwebtoken");
const db = require("../../../models");
require("dotenv").config({
    path: path.resolve(__dirname, "../../../.env"),
});

const users = db["user"];
const BASE_REDIRECT = "localhost:3000";
const KEY_JWT = process.env.JWT_KEY;

async function forgotPassword(email) {
    const account = await users.findOne({ where: { email } });
    if (!account) return messages.error(500, "Account not found");

    const payload = { id: account["id"] };
    const token = jwt.sign(payload, KEY_JWT, {
        expiresIn: "4h",
    });

    const content = {
        username: account["username"],
        redirect: `http://${BASE_REDIRECT}/reset/${token}`,
    };

    await sendMail(account["email"], "RESET PASSWORD", content);
    return messages.success(
        "Please check your email to reset your password, expired in 4 hours"
    );
}

module.exports = forgotPassword
