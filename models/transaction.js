"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class transaction extends Model {
        static associate(models) {
            this.belongsTo(models["user"], { foreignKey: "id_user" });
            this.hasMany(models["transaction_item"], {
                foreignKey: "id_transaction",
            });
        }
    }
    transaction.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            id_user: DataTypes.UUID,
            total_price: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: "transaction",
            underscored: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );
    return transaction;
};
