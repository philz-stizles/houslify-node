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
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  };
  Apartment.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      beds: DataTypes.INTEGER,
      baths: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      size: DataTypes.INTEGER,
      isPrepaid: DataTypes.BOOLEAN,
      isRecommended: DataTypes.BOOLEAN,
      isActive: DataTypes.BOOLEAN,
      createdBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'Apartment',
      tableName: 'apartments',
    }
  );
  return Apartment;
};