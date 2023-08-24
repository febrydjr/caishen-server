"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "cart_items",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: uuidv4(),
                },
                id_cart: {
                    type: Sequelize.UUID,
                },
                id_product: {
                    type: Sequelize.UUID,
                },
                qty: {
                    type: Sequelize.INTEGER,
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW,
                },
                updated_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW,
                },
            },
            { underscored: true }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("cart_items");
    },
};
