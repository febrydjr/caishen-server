const db = require("../../../models");
const { messages } = require("../../helpers");

const products = db["product"];
const categories = db["category"];

const includeOptions = [
    {
        attributes: ["id", "name"],
        model: categories,
        through: {
            attributes: [],
        },
    },
];

async function getProduct(id) {
    const result = await products.findOne({
        include: includeOptions,
        where: { id },
        order: [[categories, "name", "ASC"]],
    });
    if (!result) return messages.error(404, "Product Not Found");
    return messages.success("", result);
}

module.exports = getProduct;
