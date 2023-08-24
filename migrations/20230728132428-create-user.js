"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",
      {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: uuidv4(),
        },
        name: {
          type: Sequelize.STRING,
        },
        username: {
          type: Sequelize.STRING,
          unique: true,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
        },
        phone: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        avatar: {
          type: Sequelize.STRING,
          unique: true,
        },
        is_admin: {
          type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("users");
  },
};
