"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class transaction_item extends Model {
        static associate(models) {
            this.belongsTo(models["transaction"], {
                foreignKey: "id_transaction",
            });
            this.belongsTo(models["product"], {
                foreignKey: "id_product",
            });
        }
    }
    transaction_item.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            id_transaction: DataTypes.UUID,
            id_product: DataTypes.UUID,
            price: DataTypes.BIGINT,
            qty: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "transaction_item",
            underscored: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );
    return transaction_item;
};
