const router = require("express").Router();
const { auth, multer, isAdmin } = require("../middleware");
const { productController } = require("../controllers");

router.get("/", auth, productController.getProducts);
router.get("/categories", productController.getCategories);
router.get("/active/:id", productController.activateProduct)
router.get("/:id", productController.getProduct);

router.post("/category", productController.addCategory);
router.post(
    "/",
    auth,
    multer.single("image"),
    productController.addProduct
);
router.post(
    "/product-categories",
    auth,
    isAdmin,
    productController.addProductCategories
);

router.patch("/category", productController.editCategory);
router.patch("/:id", multer.single("image"), productController.editProduct);

router.delete("/category/:categoryId", productController.deleteCategory);
router.delete(
    "/product-category/:id_product/:id_category",
    auth,
    isAdmin,
    productController.deleteProductCategory
);
router.delete("/:id", auth, isAdmin, productController.deleteProduct);

module.exports = router;
