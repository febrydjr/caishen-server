const db = require("../../../models");
const Category = db.category;
const messages = require("../../helpers/messages");

async function checkCategory(name) {
  try {
    const existingCategory = await Category.findOne({ where: { name } });
    return existingCategory !== null;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addCategory(name) {
  const t = await db.sequelize.transaction();
  try {
    const categoryExists = await checkCategory(name);
    if (categoryExists) {
      throw messages.error(400, "Category name already exists");
    }
    const newCategory = await Category.create({ name }, { transaction: t });
    await t.commit();
    return messages.success("Category added successfully", newCategory);
  } catch (error) {
    await t.rollback();
    throw messages.error(500, error.message);
  }
}

module.exports = addCategory;
