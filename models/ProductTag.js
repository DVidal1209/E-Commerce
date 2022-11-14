const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Creation of ProductTag model using sequelize. This model is used to manage the many to many relationship between Product and Tag
class ProductTag extends Model {}

ProductTag.init(
  {
    // definition of ProductTag columns
    id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
        unique: false,
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
