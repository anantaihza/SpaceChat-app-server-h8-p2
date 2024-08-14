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

      const group = await Group.findByPk(groupId);
      if (!group) {
        throw { name: "NotFound" };
      }

      const groupExist = await UserGroup.findOne({
        where: {
          UserId: UserId,
          GroupId: groupId,
        },
      });

      if (groupExist) {
        throw { name: "AlreadyJoin" };
      }

      const joinedGroup = await UserGroup.create({
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

      const myGroups = await UserGroup.findAll({
        include: [
          {
            model: Group,
            attributes: {
              exclude: [`createdAt`, `updatedAt`],
            },
          },
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

  static async detailGroup(req, res, next) {
    try {
      const { groupId } = req.params;
      const group = await Group.findByPk(groupId);
      if (!group) {
        throw { name: "NotFound" };
      }
      const detailGroup = await UserGroup.findOne({
        where: {
          GroupId: groupId,
        },
        include: {
          model: Group,
          attributes: {
            exclude: [`createdAt`, `updatedAt`],
          },
        },
        attributes: {
          exclude: [`createdAt`, `updatedAt`],
        },
      });
      res.status(200).json(detailGroup);
    } catch (error) {
      next(error);
    }
  }

  static async handleDeleteMyGroup(req, res, next) {
    try {
      const { groupId } = req.params;
      const deleted = await UserGroup.destroy({
        where: { id: groupId },
      });
      if (deleted) {
        res.status(200).json({ message: "Group successfully deleted" });
      } else {
        res.status(404).json({ name: "NotFound" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GroupController;
