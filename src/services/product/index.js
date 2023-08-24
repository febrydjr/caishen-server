const getProduct = require("./getProduct");
const getProducts = require("./getProducts");
const addProduct = require("./addProduct");
const deleteProduct = require("./deleteProduct");
const activateProduct = require("./activateProduct");
const editProduct = require("./editProduct");

const addCategory = require("./addCategory");
const editCategory = require("./editCategory");
const deleteCategory = require("./deleteCategory");
const getCategories = require("./getCategories");

const addProductCategories = require("./addProductCategories");
const deleteProductCategory = require("./deleteProductCategory");

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    activateProduct,
    editProduct,
    getCategories,
    addCategory,
    editCategory,
    deleteCategory,
    addProductCategories,
    deleteProductCategory,
};
