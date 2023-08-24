const { Op } = require("sequelize");
const db = require("../../../models");
const { messages } = require("../../helpers");

const products = db["product"];
const categories = db["category"];
const product_categories = db["product_category"];

async function checkCategories(id_categories) {
    const result = await categories.findAll({
        where: {
            id: id_categories,
        },
    });
    return result.map((category) => category.id);
}

async function checkAlreadyExist(id_product, id_categories) {
    const newCategories = [];
    for (let id_category of id_categories) {
        const isExist = await product_categories.findOne({
            where: {
                [Op.and]: [{ id_product }, { id_category }],
            },
        });
        if (!isExist && !newCategories.includes(id_category))
            newCategories.push(id_category);
    }
    return newCategories;
}

async function addProductCategories(id_product, id_categories, transactionPass) {
    const isProductExist = products.findOne({ where: { id: id_product } });
    if (!isProductExist) return messages.error(404, "Product not found");

    id_categories = id_categories
        .split(",")
        .map((id_category) => parseInt(id_category));

    id_categories = await checkCategories(id_categories);
    if (id_categories.length === 0)
        return messages.error(404, "Some category not found");

    id_categories = await checkAlreadyExist(id_product, id_categories);
    if (id_categories.length === 0)
        return messages.error(500, "No new catagories added");

    return await db.sequelize.transaction(async function (t) {
        for (let id_category of id_categories) {
            await product_categories.create(
                { id_product, id_category },
                { transaction: transactionPass ? transactionPass : t }
            );
        }
        return messages.success("Product category successfully added");
    });
}

module.exports = addProductCategories;
