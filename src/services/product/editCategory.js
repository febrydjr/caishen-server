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

async function editCategory(categoryId, name) {
  const t = await db.sequelize.transaction();
  try {
    const category = await Category.findByPk(categoryId, { transaction: t });
    if (!category) {
      throw messages.error(404, "Category not found");
    }
    const categoryExists = await checkCategory(name);
    if (categoryExists) {
      throw messages.error(400, "Category name already exists");
    }
    category.name = name;
    await category.save({ transaction: t });
    await t.commit();
    return messages.success("Category updated successfully", category);
  } catch (error) {
    await t.rollback();
    throw messages.error(500, error.message);
  }
}

module.exports = editCategory;
