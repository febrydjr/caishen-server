const db = require("../../../models");
const { messages } = require("../../helpers");
const deleteItem = require("./deleteItem");

const cart_items = db["cart_item"];
const products = db["product"];

async function checkStock(id, qty) {
    const product = await products.findOne({where: {id}});
    return qty <= product["stock"];
}

async function editItem(id, id_product, qty) {
    const isReady = await checkStock(id_product, qty);
    if(!isReady) return messages.error(500, "Item stock exceed");

    const isExist = await cart_items.findOne({where: {id}});
    if(!isExist) return messages.error(404, "Item not found");

    return await db.sequelize.transaction(async function (t) {
        if(qty === 0) await deleteItem(id);
        else await cart_items.update({ qty }, { where: { id }, transaction: t });
        return messages.success("Product successfully updated");
    });
}

module.exports = editItem;
