'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
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
  Hotel.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Hotel',
    tableName: 'hotels'
  });
  return Hotel;
};