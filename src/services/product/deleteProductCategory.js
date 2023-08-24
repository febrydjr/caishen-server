const { Op } = require("sequelize");
const db = require("../../../models");
const { messages } = require("../../helpers");

const product_categories = db["product_category"];

async function deleteProductCategory(id_product, id_category) {
    const isExist = await product_categories.findOne({
        where: { [Op.and]: [{ id_product }, { id_category }] },
    });
    if (!isExist) return messages.error(404, "Product category not found");
    return await db.sequelize.transaction(async function (t) {
        await product_categories.destroy(
            {
                where: {
                    [Op.and]: [{ id_product }, { id_category }],
                },
            },
            { transaction: t }
        );
        return messages.success("Product category successfully deleted");
    });
}

module.exports = deleteProductCategory;
