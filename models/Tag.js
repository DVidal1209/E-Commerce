const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// Creation of Tag model using sequelize
class Tag extends Model {}

Tag.init(
  {
    // Definition of Tag tables's columns
    id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
