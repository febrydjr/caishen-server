const db = require("../../../models");
const { messages } = require("../../helpers");

const cart_items = db["cart_item"];

async function deleteItem(id) {
    const isExist = await cart_items.findOne({ where: { id } });
    if (!isExist) return messages.error(404, "Item not found");

    return await db.sequelize.transaction(async function (t) {
        await cart_items.destroy({ where: { id } });
        return messages.success("Item deleted successfully");
    });
}

module.exports = deleteItem;
