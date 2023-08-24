const { messages } = require("../../helpers");
const db = require("../../../models");
const { Op } = require("sequelize");

const products = db["product"];
const categories = db["category"];

function includeOptions(id) {
    const whereOptions = {};
    if (id) whereOptions["id"] = parseInt(id);
    return [
        {
            attributes: ["id", "name"],
            model: categories,
            through: {
                attributes: [],
            },
            where: whereOptions,
        },
    ];
}

function setPagination(page = 1, limit = 10) {
    return {
        offset: (page - 1) * limit,
        limit: parseInt(limit),
    };
}

async function getProducts(account, query) {
    const { title, id_category, order_by, order, page, limit } = query;

    const pagination = setPagination(page, limit);
    const whereOptions = {};
    if (!account["is_admin"]) whereOptions["is_active"] = true;
    if (title) whereOptions["name"] = { [Op.like]: `%${title}%` };

    const includeOption = includeOptions(id_category);

    let countProduct = await products.findAll({
        include: includeOption,
        where: whereOptions,
    });
    countProduct = countProduct.length;

    const result = await products.findAll({
        include: includeOption,
        where: whereOptions,
        order: [
            [order_by || "name", order || "ASC"],
            [categories, "name", "ASC"],
        ],
        ...pagination,
    });

    return messages.success("", {
        pages: Math.ceil(countProduct / (limit || 10)),
        products: result,
    });
}

module.exports = getProducts;
