"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class cart extends Model {
        static associate(models) {
            this.belongsTo(models["user"], { foreignKey: "id_user" });
            this.hasMany(models["cart_item"], { foreignKey: "id_cart" });
        }
    }
    cart.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            id_user: DataTypes.UUID,
        },
        {
            sequelize,
            modelName: "cart",
            underscored: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );
    return cart;
};
