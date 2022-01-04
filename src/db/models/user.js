'use strict';
const {
  Model
} = require('sequelize');
const  Address = require('./address');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
          throw new Error('Do not try to set the `fullName` value!');
        },
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: true,
        unique: true, // Constraint - SequelizeUniqueConstraintError
        set(value) {
          // this.setDataValue('username', value.trim());
        },
      },
      // Creating two objects with the same value will throw an error. The unique property can be either a
      // boolean, or a string. If you provide the same string for multiple columns, they will form a
      // composite unique key.
      // uniqueOne: { type: DataTypes.STRING, unique: 'compositeIndex' },
      // uniqueTwo: { type: DataTypes.INTEGER, unique: 'compositeIndex' },
      email: {
        type: DataTypes.STRING,
        allowNull: false, // Both a Validator & Constraint
        unique: true, // Constraint
        validate: {
          isEmail: true,
        },
        set(value) {
          this.setDataValue('email', value.toLowerCase());
        },
      },
      password: {
        type: DataTypes.STRING(120),
        allowNull: false,
        // is: /^[0-9a-f]{64}$/i,
        validate: {
          len: [6, 50],
        },
        // async set(value) {
        //   /// Generate salt
        //   const salt = await bcrypt.genSalt(12);

        //   // Encrypt password
        //   const hashedPassword = await bcrypt.hash(value + this.username, salt);
        //   this.setDataValue('password', hashedPassword);

        //   // Delete confirmPassword field
        //   // this.setDataValue('confirmPassword', undefined);
        // },
      },
      passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'password_changed_at',
      },
      passwordResetToken: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'password_reset_token',
      },
      passwordResetTokenExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'password_reset_token_expires_at',
        // // Comments can only be added to columns in MySQL, MariaDB, PostgreSQL and MSSQL
        comment: 'This is a column name that has a comment',
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'default.jpg',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'is_active',
      },
      isTwoFactorAuthenticationEnabled: DataTypes.BOOLEAN,
      twoFactorAuthenticationCode: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  // Here we associate which actually populates out pre-declared `association` static and other methods.
  // Addresses - one-to-many.
  User.hasMany(Address, {
    foreignKey: 'user_id', // this determines the name in `associations`!
    as: 'addresses',
  });
  Address.belongsTo(User, { foreignKey: 'user_id' });

  return User;
};