'use strict';
const {
  Model
} = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Address, { foreignKey: 'userId', as: 'addresses' });
      this.hasMany(models.Apartment, { foreignKey: 'userId', as: 'apartments' });
      this.hasMany(models.Hotel, {
        foreignKey: 'userId',
        as: 'hotels',
      });
      this.hasMany(models.RealEstate, {
        foreignKey: 'userId',
        as: 'realEstates',
      });
      this.hasMany(models.CoWorkingSpace, {
        foreignKey: 'userId',
        as: 'coworkingSpaces',
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        field: 'first_name',
      },
      lastName: {
        type: DataTypes.STRING(32),
        allowNull: false,
        field: 'last_name',
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
      salt: {
        type: DataTypes.STRING,
      },
      hashedPassword: {
        type: DataTypes.STRING(120),
        allowNull: false,
        field: 'hashed_password',
        validate: {
          len: [6, 50],
        },
        set(value) {
          // Encrypt password
          this.setDataValue(
            'salt',
            Math.round(new Date().valueOf() * Math.random()) + ''
          );
          console.log('SALT IN HASHEDPASSWORD', this.getDataValue('salt'));
          const hashedPassword = crypto
            .createHmac('sha1', this.getDataValue('salt'))
            .update(value)
            .digest('hex');
          this.setDataValue('hashedPassword', hashedPassword);
        },
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
      isTwoFactorAuthenticationEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_two_factor_authentication_enabled',
      },
      twoFactorAuthenticationCode: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'two_factor_authentication_code',
      },
      role: {
        type: DataTypes.STRING,
      },
      createdBy: DataTypes.STRING,
      updatedBy: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'User',
      tableName: 'users',
    }
  );

  // Here we associate which actually populates out pre-declared `association` static and other methods.
  // Addresses - one-to-many.
  // User.hasMany(Address, {
  //   foreignKey: 'user_id', // this determines the name in `associations`!
  //   as: 'addresses',
  // });
  // Address.belongsTo(User, { foreignKey: 'user_id' });

  return User;
};