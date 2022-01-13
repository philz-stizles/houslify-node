'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Apartment.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      bed: DataTypes.INTEGER,
      bath: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      size: DataTypes.INTEGER,
      isRecommended: DataTypes.BOOLEAN,
      isActive: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      createdBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Apartment',
      tableName: 'apartments'
    }
  );
  return Apartment;
};