const fs = require("fs").promises;
const db = require("../../../models");
const { messages } = require("../../helpers");
const addProductCategories = require("./addProductCategories");

const products = db["product"];
const product_categories = db["product_category"];

function createUpdateField(name, description, price, stock, image) {
  const fields = {};
  if (name) fields["name"] = name;
  if (description) fields["description"] = description;
  if (price) fields["price"] = price;
  if (stock) fields["stock"] = stock;
  if (image) fields["image"] = image.path;

  return fields;
}

async function updateCategories(id, id_categories) {
  await db.sequelize.transaction(async function (t) {
    await product_categories.destroy({ where: { id } }, { transaction: t });
    await addProductCategories(id, id_categories);
  });
}

async function editProduct({
  id,
  name,
  description,
  price,
  stock,
  id_categories,
  image
}) {
  const updateField = createUpdateField(
    name,
    description,
    price,
    stock,
    image
  );
  const oldProduct = await products.findOne({ where: { id } });
  return await db.sequelize.transaction(async function (t) {
    await products.update(updateField, {
      where: { id },
      transaction: t,
    });
    if (id_categories) await updateCategories(id, id_categories);
    if (image) await fs.unlink(oldProduct['dataValues']["image"]);
    return messages.success("Product successfully updated");
  });
}

module.exports = editProduct;
