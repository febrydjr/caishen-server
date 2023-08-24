const { Op, fn, col } = require("sequelize");
const db = require("../../../models");
const { messages } = require("../../helpers");

const transactions = db["transaction"];

function setDate(date) {
    date = date ? new Date(date) : new Date();
    return date;
}

function endDate(date) {
    date = setDate(date);
    date.setDate(date.getDate() + 1);
    return date;
}

async function getTotalTransactions(queries) {
    let { start_date, end_date } = queries;
    start_date = setDate(start_date);
    end_date = end_date ? endDate(end_date) : setDate();
    const result = await transactions.findAll({
        attributes: [
            [fn("date", col("created_at")), "date"],
            [fn("sum", col("total_price")), "total"],
        ],
        order: [["created_at", "ASC"]],
        group: ["date"],
        where: {
            created_at: {
                [Op.between]: [start_date, end_date],
            },
        },
    });
    return messages.success("", result);
}

module.exports = getTotalTransactions;
