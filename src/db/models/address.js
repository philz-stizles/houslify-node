'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Address.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
      },
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      code: DataTypes.STRING,
      country: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      isPrimary: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      createdBy: DataTypes.NUMBER,
      updatedBy: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'Address',
    }
  );
  return Address;
};