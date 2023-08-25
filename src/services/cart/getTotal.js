// const { fn, literal, cast } = require("sequelize");
// const db = require("../../../models");
// const { messages } = require("../../helpers");

// const carts = db["cart"];
// const products = db["product"];
// const cart_items = db["cart_item"];

// async function checkCart(id_user) {
//     const result = await carts.findOne({ where: { id_user } });
//     return result;
// }

// async function getTotal(id) {
//     const cart = await checkCart(id);
//     if (!cart) return messages.error(500, "No cart found");

//     let result = await cart_items.findOne({
//         attributes: [
//             "id_cart",
//             [
//                 cast(fn("SUM", literal("qty * product.price")), "UNSIGNED"),
//                 "total",
//             ],
//         ],
//         include: [{ model: products, attributes: [] }],
//         where: { id_cart: cart["id"] },
//     });

//     if (!result.dataValues["total"]) result = { id_cart: cart["id"], total: 0 };
//     return messages.success("", result);
// }

// module.exports = getTotal;

const { fn, literal, cast } = require("sequelize");
const db = require("../../../models");
const { messages } = require("../../helpers");

const carts = db["cart"];
const products = db["product"];
const cart_items = db["cart_item"];

async function checkCart(id_user) {
    const result = await carts.findOne({ where: { id_user } });
    return result;
}

async function getTotal(id) {
    const cart = await checkCart(id);
    if (!cart) return messages.error(500, "No cart found");

    const result = await cart_items.findOne({
        attributes: [
            "id_cart",
            [
                cast(fn("SUM", literal("qty * product.price")), "UNSIGNED"),
                "total",
            ],
        ],
        include: [
            { model: products, attributes: [] },
            // Include this line to group by cart items
            { model: carts, attributes: [], required: true },
        ],
        where: { id_cart: cart["id"] },
        group: ["cart_item.id_cart"], // Group by cart ID
    });

    // If no rows match the query, return 0 as total
    const total = result ? result.dataValues["total"] : 0;
    
    return messages.success("", { id_cart: cart["id"], total });
}

module.exports = getTotal;
