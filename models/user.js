"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.hasMany(models["cart"], { foreignKey: "id_user" });
      this.hasMany(models["transaction"], { foreignKey: "id_user" });
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: {
        type: DataTypes.STRING,
        unique: true,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        { unique: true, fields: ["username"] },
        { unique: true, fields: ["email"] },
        { unique: true, fields: ["avatar"] },
      ],
    }
  );
  return user;
};
