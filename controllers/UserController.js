const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        throw { name: "SequelizeValidationError" };
      }
      if (!email) {
        throw { name: "SequelizeValidationError" };
      }
      if (!password) {
        throw { name: "SequelizeValidationError" };
      }
      const user = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "BadRequest", message: "Email or Password is required" };
      }
      const foundUser = await User.findOne({
        where: {
          email: {
            [Op.eq]: email,
          },
        },
      });
      if (!foundUser) {
        throw { name: "Unauthorized" };
      }
      const comparePass = comparePassword(password, foundUser.password);
      if (!comparePass) {
        throw { name: "Unauthorized" };
      }
      const access_token = signToken({ id: foundUser.id });
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
