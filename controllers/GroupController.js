const { where } = require("sequelize");
const { UserGroup, User, Group } = require(`../models/index.js`);

class GroupController {
  static async fetchGroups(req, res, next) {
    try {
      const Groups = await Group.findAll({
        attributes: {
          exclude: [`createdAt`, `updatedAt`],
        },
      });
      //   console.log(Groups);
      res.status(200).json(Groups);
    } catch (error) {
      next(error);
    }
  }

  static async joinGroup(req, res, next) {
    try {
      const { groupId } = req.params;
      const UserId = req.user.id;

      const joinedGroup = UserGroup.create({
        UserId,
        GroupId: groupId,
      });

      res.status(201).json({
        id: joinedGroup.id,
        UserId: joinedGroup.UserId,
        GroupId: joinedGroup.GroupId,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchMyGroups(req, res, next) {
    try {
      const UserId = req.user.id;

      const myGroups = UserGroup.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: [`createdAt`, `updatedAt`],
            },
          },
        ],
        where: {
          UserId,
        },
        attributes: {
          exclude: [`createdAt`, `updatedAt`],
        },
      });

      res.status(200).json(myGroups);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GroupController;
