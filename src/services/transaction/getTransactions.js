const { Op } = require("sequelize");
const db = require("../../../models");
const { messages } = require("../../helpers");

const users = db["user"];
const products = db["product"];
const transactions = db["transaction"];
const transaction_items = db["transaction_item"];

function setDate(date) {
    date = date ? new Date(date) : new Date();
    return date;
}

function endDate(date) {
    date = setDate(date);
    date.setDate(date.getDate() + 1);
    return date;
}

function includeOptions(start_date, end_date) {
    start_date = setDate(start_date);
    end_date = end_date ? endDate(end_date) : setDate();
    return [
        {
            model: transaction_items,
            attributes: ["price", "qty"],
            include: [
                {
                    model: products,
                    attributes: ["name", "image"],
                },
            ],
            where: {
                created_at: {
                    [Op.between]: [start_date, end_date],
                },
            },
        },
        {
            model: users,
            attributes: ["username", "name", "avatar"],
        },
    ];
}

async function getTransactions(queries) {
    const { start_date, end_date, order } = queries;
    const result = await transactions.findAll({
        attributes: ["total_price", ["created_at", "date"]],
        include: includeOptions(start_date, end_date),
        order: [["created_at", order || "DESC"]]
    });
    return messages.success("", result);
}

module.exports = getTransactions;
