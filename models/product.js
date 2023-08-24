"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class product extends Model {
        static associate(models) {
            this.hasMany(models.product_category, {
                foreignKey: "id_product",
            }),
            this.hasMany(models.cart_item, {
                foreignKey: "id_product",
            }),
            this.hasMany(models.transaction_item, {
                foreignKey: "id_product",
            });
            this.belongsToMany(models.category, {through: models.product_category, foreignKey:"id_product"});
        }
    }
    product.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            image: {
                type: DataTypes.STRING,
                unique: true,
            },
            stock: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            price: DataTypes.BIGINT,
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            sequelize,
            modelName: "product",
            createdAt: "created_at",
            updatedAt: "updated_at",
            underscored: true,
            indexes: [
                {
                    unique: true,
                    fields: ["image"],
                },
            ],
        }
    );
    return product;
};
