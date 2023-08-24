const db = require("../../../models");
const { messages } = require("../../helpers");
const addProductCategories = require("./addProductCategories");

const products = db["product"];

async function addProduct(req) {
    const { path } = req.file;
    const { name, description, price, stock, id_categories } = req.body;
    return db.sequelize.transaction(async function (t) {
        const result = await products.create(
            {
                name,
                description,
                price,
                stock: stock || 0,
                image: path,
            },
            { transaction: t }
        );
        await addProductCategories(result["id"], id_categories, t);
        return messages.success("Product successfully added");
    });
}

module.exports = addProduct;
