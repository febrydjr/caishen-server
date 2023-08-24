"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "carts",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: uuidv4(),
                },
                id_user: {
                    type: Sequelize.UUID,
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
        await queryInterface.dropTable("carts");
    },
};
