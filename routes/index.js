const authentication = require("../middlewares/authentication");
const router = require(`express`).Router();
const routerGroup = require(`./groups`);
const routerMyGroup = require(`./myGroups`);
const routerChat = require(`./chats`);

router.use(authentication);

router.use(`/groups`, routerGroup);
router.use(`/myGroups`, routerMyGroup);
router.use(`/chats`, routerChat);

module.exports = router;