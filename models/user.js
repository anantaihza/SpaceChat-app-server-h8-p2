"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Group, {
        through: models.UserGroup,
        foreignKey: `UserId`,
      });

      User.hasMany(models.UserGroup, {
        foreignKey: `UserId`,
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Username is required`,
          },
          notEmpty: {
            msg: `Username is required`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: `Email is already in use`,
        },
        validate: {
          notNull: {
            msg: `Email is required`,
          },
          notEmpty: {
            msg: `Email is required`,
          },
          isEmail: {
            msg: `Invalid email format`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Password is required`,
          },
          notEmpty: {
            msg: `Password is required`,
          },
          len: {
            args: [4],
            msg: `Minimum password length is 4`,
          },
        },
      },
      imgUrl: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Name is required`,
          },
          notEmpty: {
            msg: `Name is required`,
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (instance) => {
          instance.password = hashPassword(instance.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
