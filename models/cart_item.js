"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class cart_item extends Model {
        static associate(models) {
            this.belongsTo(models["cart"], { foreignKey: "id_cart" });
            this.belongsTo(models["product"], { foreignKey: "id_product" });
        }
    }
    cart_item.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            id_cart: DataTypes.UUID,
            id_product: DataTypes.UUID,
            qty: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
        },
        {
            sequelize,
            modelName: "cart_item",
            underscored: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );
    return cart_item;
};
