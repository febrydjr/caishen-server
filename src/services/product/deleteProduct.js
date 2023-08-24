const db = require("../../../models");
const { messages } = require("../../helpers");

const products = db["product"];

async function deleteProduct(id) {
    return db.sequelize.transaction(async function (t) {
        await products.update(
            { is_active: 0 },
            { where: { id }, transaction: t }
        );
        return messages.success("Product successfully disabled");
    });
}

module.exports = deleteProduct;
