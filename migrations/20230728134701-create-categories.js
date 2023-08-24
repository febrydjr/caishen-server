"use strict";
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "categories",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                },
                name: {
                    type: Sequelize.STRING,
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
        await queryInterface.dropTable("categories");
    },
};
