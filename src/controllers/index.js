const authController = require("./authController");
const profileController = require("./profileController");
const productController = require("./productController");
const cartController = require("./cartController");
const transactionController = require("./transactionsController");

module.exports = {
    profileController,
    authController,
    productController,
    cartController,
    transactionController,
};
