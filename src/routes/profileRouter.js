const router = require("express").Router();
const { profileController } = require("../controllers");
const { auth, multer } = require("../middleware");

router.get("/", auth, profileController.getProfile);
router.post(
  "/avatar",
  auth,
  multer.single("avatar"),
  profileController.updateAvatar
);

router.get("/cashiers", profileController.getAllProfiles);
router.delete("/user/:username", profileController.deleteUser);
router.patch("/user", profileController.activateUser);

module.exports = router;
