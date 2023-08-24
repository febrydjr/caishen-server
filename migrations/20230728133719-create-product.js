"use strict";
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "products",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: uuidv4(),
                },
                name: {
                    type: Sequelize.STRING,
                },
                description: {
                    type: Sequelize.TEXT,
                },
                image: {
                    type: Sequelize.STRING,
                },
                stock: {
                    type: Sequelize.INTEGER,
                },
                price: {
                    type: Sequelize.BIGINT,
                },
                is_active: {
                    type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable("products");
    },
};
