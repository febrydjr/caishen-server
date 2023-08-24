const router = require("express").Router();
const { cartController } = require("../controllers");
const { auth } = require("../middleware");

router.get("/", auth, cartController.getItems);
router.get("/total", auth, cartController.getTotal);
router.post("/", auth, cartController.addItem);
router.patch("/", auth, cartController.editItem);
router.delete("/", auth, cartController.resetCart);
router.delete("/:id", auth, cartController.deleteItem);


module.exports = router;
