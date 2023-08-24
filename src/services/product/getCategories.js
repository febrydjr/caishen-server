const db = require("../../../models");
const { messages } = require("../../helpers");

const categories = db["category"];

async function getCategories() {
    const result = await categories.findAll({
        order: [["name", "ASC"]],
    });
    return messages.success("", result);
}

module.exports = getCategories;
