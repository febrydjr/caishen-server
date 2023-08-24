"use strict";
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "product_categories",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: uuidv4(),
                },
                id_product: {
                    type: Sequelize.UUID,
                },
                id_category: {
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
        await queryInterface.dropTable("product_categories");
    },
};
