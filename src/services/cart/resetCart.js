const db = require("../../../models");
const { messages } = require("../../helpers");

const carts = db["cart"];
const cart_items = db["cart_item"];

async function resetCart(id_user) {
    const cart = await carts.findOne({ where: { id_user } });
    if (!cart) return messages.error(404, "Cart not found");

    const isExist = await cart_items.findAll({
        where: { id_cart: cart["id"] },
    });
    if (!isExist) return messages.error(500, "Cart Item not found");

    return await db.sequelize.transaction(async function (t) {
        await cart_items.destroy({
            where: { id_cart: cart["id"] },
            transaction: t,
        });
        await carts.update({ total_price: 0 }, { where: { id: cart["id"] } });
        return messages.success("Cart successfully reset");
    });
}

module.exports = resetCart;
