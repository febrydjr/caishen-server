const fs = require("fs").promises;
const { productService } = require("../services");
const { messages } = require("../helpers");

async function getProducts(req, res) {
    try {
        const { account } = req;
        const query = req.query;
        const result = await productService.getProducts(account, query);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getProduct(req, res) {
    try {
        const { id } = req.params;
        const result = await productService.getProduct(id);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function addProduct(req, res) {
    try {
        const result = await productService.addProduct(req);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        if (req.file) await fs.unlink(req.file.path);
        res.status(500).json({ message: error.message });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const result = await productService.deleteProduct(id);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function activateProduct(req, res) {
    try {
        const { id } = req.params;
        const result = await productService.activateProduct(id);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function editProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, description, price, stock, id_categories } = req.body;
        const { file } = req;
        const result = await productService.editProduct({
            id,
            name,
            description,
            price,
            stock,
            id_categories,
            image: file,
        });
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        if (req.file) await fs.unlink(req.file.path);
        res.status(500).json({ message: error.message });
    }
}

async function getCategories(req, res) {
    try {
        const result = await productService.getCategories();
        return res.status(result.status).json(messages.response(result));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function addCategory(req, res) {
    try {
        const { name } = req.body;
        const newCategory = await productService.addCategory(name);
        return res.status(201).json(messages.response(newCategory));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function editCategory(req, res) {
    try {
        const { categoryId, name } = req.body;
        const updatedCategory = await productService.editCategory(
            categoryId,
            name
        );
        return res.status(200).json(messages.response(updatedCategory));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function deleteCategory(req, res) {
    try {
        const { categoryId } = req.params;
        await productService.deleteCategory(categoryId);
        return res
            .status(200)
            .json(messages.success("Category deleted successfully"));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function addProductCategories(req, res) {
    try {
        const { id_product, id_categories } = req.body;
        const result = await productService.addProductCategories(
            id_product,
            id_categories
        );
        return res.status(result.status).json(messages.response(result));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

async function deleteProductCategory(req, res) {
    try {
        const { id_product, id_category } = req.params;
        const result = await productService.deleteProductCategory(
            id_product,
            id_category
        );
        return res.status(result.status).json(messages.response(result));
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    addProduct,
    getProduct,
    getProducts,
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
