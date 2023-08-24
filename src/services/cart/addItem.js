const { Op } = require("sequelize");
const db = require("../../../models");
const { messages } = require("../../helpers");
const editItem = require("./editItem");

const carts = db["cart"];
const cart_items = db["cart_item"];
const products = db["product"];

async function createCart(id_user) {
    return await db.sequelize.transaction(async function (t) {
        return await carts.create({ id_user }, { transaction: t });
    });
}

async function getCart(id_user) {
    const cart = await carts.findOne({ where: { id_user } });
    return cart ? cart : await createCart(id_user);
}

async function checkStock(id) {
    const product = await products.findOne({ where: { id } });
    console.log(product);
    return product["dataValues"]["stock"];
}

async function addItem(id_user, id_product) {
    const stock = await checkStock(id_product);
    if (stock === 0) return messages.error(500, "No stock found");
    const cart = await getCart(id_user);
    const isExist = await cart_items.findOne({
        where: { [Op.and]: [{ id_cart: cart["id"] }, { id_product }] },
    });

    return await db.sequelize.transaction(async function (t) {
        if (isExist) {
            return await editItem(
                isExist["id"],
                id_product,
                isExist["qty"] + 1
            );
        } else await cart_items.create({ id_cart: cart["id"], id_product }, { transaction: t });
        return messages.success("Item added successfully");
    });
}

module.exports = addItem;
