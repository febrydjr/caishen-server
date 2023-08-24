const db = require("../../../models");
const { messages } = require("../../helpers");

const products = db["product"];

async function activateProduct(id) {
    return db.sequelize.transaction(async function (t) {
        await products.update(
            { is_active: 1 },
            { where: { id }, transaction: t }
        );
        return messages.success("Product successfully activate");
    });
}

module.exports = activateProduct;
