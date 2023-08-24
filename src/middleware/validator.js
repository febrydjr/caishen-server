const path = require("path");
const { body, validationResult } = require("express-validator");
require("dotenv").config({
  path: path.resolve("../../.env"),
});

const vId = body("identifier").notEmpty().withMessage("ID is empty");
const vPassword = body("password").notEmpty().withMessage("Password is empty");
const loginValidator = [vId, vPassword];

const vUsername = body("username")
  .notEmpty()
  .withMessage("Username is empty")
  .bail()
  .isLength({ min: 8 })
  .withMessage("Username length min 8");
const vEmail = body("email")
  .notEmpty()
  .withMessage("Email is empty")
  .bail()
  .trim()
  .isEmail()
  .withMessage("Email is not valid");
const vPhone = body("phone")
  .notEmpty()
  .withMessage("Phone is Empty")
  .bail()
  .isMobilePhone()
  .withMessage("Invalid phone number");
const vSetPassword = vPassword
  .bail()
  .isStrongPassword({
    minLength: 6,
  })
  .withMessage(
    "Password length min 8, uppercase min 1, number min 1, symbol min 1"
  );
const vName = body("name")
  .notEmpty()
  .withMessage("Name is empty")
  .bail()
  .isLength({ min: 2, max: 50 })
  .withMessage("Name length must be between 2 and 50 characters");
const registerValidator = [vName, vEmail, vUsername, vPhone];

function vResult(req, res, next) {
  const { errors } = validationResult(req);
  if (errors.length > 0) return res.status(400).json(errors);
  next();
}

//middleware buat cek admin, hanya admin akses api register

module.exports = { loginValidator, registerValidator, vResult };
