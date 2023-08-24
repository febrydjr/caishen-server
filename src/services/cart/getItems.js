const db = require("../../../models");
const { messages } = require("../../helpers");

const carts = db["cart"];
const cart_items = db["cart_item"];
const products = db["product"];

async function getItems(id_user) {
    const cart = await carts.findOne({ where: { id_user } });
    if (!cart) return messages.error(404, "Cart not found");

    const result = await cart_items.findAll({
        attributes: {
            exclude: ["id_cart", "id_product", "created_at", "updated_at"]
        },
        where: { id_cart: cart["id"] },
        order: ["created_at"],
        include: [
            {
                model: products,
                attributes: ["id", "name", "image", "price"],
            }
        ]
    });
    return messages.success("", result);
}

module.exports = getItems;
