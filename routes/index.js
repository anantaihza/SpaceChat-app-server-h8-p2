const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const router = require(`express`).Router();
const routerGroup = require(`./groups`);
const routerMyGroup = require(`./myGroups`);
const routerChat = require(`./chats`);
const routerProfile = require(`./profile`);

router.post(`/register`, UserController.register);
router.post(`/login`, UserController.login);

router.use(authentication);

router.use(`/groups`, routerGroup);
router.use(`/myGroups`, routerMyGroup);
router.use(`/chats`, routerChat);
router.use(`/profile`, routerProfile);

module.exports = router;
