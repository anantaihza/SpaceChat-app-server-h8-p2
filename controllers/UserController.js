const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/");
const cloudinary = require("cloudinary").v2;

class UserController {
  static async register(req, res, next) {
    try {
      const { username, name, email, password } = req.body;
      // if (!username || !name || !email || !password) {
      //   throw { name: "SequelizeValidationError" };
      // }
      const user = await User.create({
        username,
        name,
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

  static async getProfile(req, res, next) {
    try {
      let { id } = req.user;
      let data = await User.findByPk(id);
      res.status(200).json({
        id: data.id,
        username: data.username,
        name: data.name,
        email: data.email,
        img: data.imgUrl
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { id } = req.user;
      const { username, name } = req.body;
      const avatar = req.file;
      // console.log(avatar, "<<<<");
      const foundUser = await User.findByPk(id);
      if (!foundUser) {
        throw { name: "NotFound" };
      } else {
        if (!avatar) {
          let update = await User.update(
            { username: username, name: name },
            { where: { id: id } }
          );
          if (update) {
            let dataUpdated = await User.findByPk(id, {
              attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
              },
            });
            res.status(200).json(dataUpdated);
          }
        } else {
          cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
          });
          const b64file = Buffer.from(req.file.buffer).toString("base64");
          const dataURI = `data:${req.file.mimetype};base64,${b64file}`;
          const uploadFile = await cloudinary.uploader.upload(dataURI, {
            folder: "profile",
            public_id: req.file.originalname,
          });
          let data = await User.update(
            { imgUrl: uploadFile.secure_url, username: username, name: name },
            { where: { id: id } }
          );
          if (data) {
            let dataUpdated = await User.findByPk(id, {
              attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
              },
            });
            res.status(200).json(dataUpdated);
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
