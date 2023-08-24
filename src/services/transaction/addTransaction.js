const getItems = require("../cart/getItems");
const getTotal = require("../cart/getTotal");
const resetItems = require("../cart/resetCart");
const getProduct = require("../product/getProduct");
const db = require("../../../models");
const { messages } = require("../../helpers");

const transactions = db["transaction"];
const transaction_items = db["transaction_item"];
const products = db["product"];
// db.sequelize.sync({ alter: true });
async function createTransaction(id_user, total_price, t) {
  const result = await transactions.create(
    {
      id_user,
      total_price,
    },
    { transaction: t }
  );
  return result;
}

async function addTransactionItems(id_transaction, product_items, t) {
  for (const product_item of product_items) {
    const item = product_item["dataValues"]["product"]["dataValues"];
    const qty = product_item["dataValues"]["qty"];
    await transaction_items.create(
      {
        id_transaction,
        id_product: item["id"],
        price: item["price"],
        qty,
      },
      { transaction: t }
    );
    const product = await getProduct(item["id"]);
    const initialStock = product["data"]["dataValues"]["stock"];
    await products.update(
      { stock: initialStock - qty },
      { where: { id: item["id"] }, transaction: t }
    );
  }
}

async function getCartTotal(id) {
  const { data } = await getTotal(id);
  return data["dataValues"] ? data["dataValues"]["total"] : data["total"];
}

async function getCartItems(id) {
  const data = await getItems(id);
  return data["data"];
}

async function addTransaction(id) {
  return await db.sequelize.transaction(async function (t) {
    const total = await getCartTotal(id);
    if (total === 0) return messages.error(400, "No item added yet");
    const product_items = await getCartItems(id);
    const transaction = await createTransaction(id, total, t);
    await addTransactionItems(transaction["id"], product_items, t);
    await resetItems(id);
    return messages.success("Transaction successfully made");
  });
}

module.exports = addTransaction;
