'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.belongsToMany(models.User, {
        through: models.UserGroup,
        foreignKey: `GroupId`
      });

      Group.hasMany(models.UserGroup, {
        foreignKey: `GroupId`
      });
    }
  }
  Group.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Name is required`
        },
        notEmpty: {
          msg: `Name is required`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Description is required`
        },
        notEmpty: {
          msg: `Description is required`
        }
      }
    },
    imgGroupUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};