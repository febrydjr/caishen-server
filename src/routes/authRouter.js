const router = require("express").Router();
const { authController } = require("../controllers");
const { validator } = require("../middleware");

router.post(
  "/login",
  validator.loginValidator,
  validator.vResult,
  authController.login
);
router.post(
  "/register",
  validator.registerValidator,
  validator.vResult,
  authController.register
);
router.post("/forgot", authController.forgotPassword);
router.patch("/reset", authController.resetPassword);
router.patch("/username", authController.changeUsername);
router.patch("/email", authController.changeEmail);

module.exports = router;
