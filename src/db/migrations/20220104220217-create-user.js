'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING(32),
      },
      lastName: {
        type: Sequelize.STRING(32),
      },
      email: {
        type: Sequelize.STRING(70),
        allowNull: false, // Both a Validator & Constraint
        unique: true,
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      isTwoFactorAuthenticationEnabled: {
        type: Sequelize.BOOLEAN,
      },
      role: {
        type: Sequelize.STRING(25),
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};