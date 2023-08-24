const db = require("../../../models");
const Category = db.category;
const messages = require("../../helpers/messages");

async function deleteCategory(categoryId) {
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw messages.error(404, "Category not found");
    }
    await category.destroy();
  } catch (error) {
    throw messages.error(500, "Failed to delete category");
  }
}

module.exports = deleteCategory;
