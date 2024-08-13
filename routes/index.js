const authentication = require("../middlewares/authentication");
const router = require(`express`).Router();
const routerGroup = require(`./groups`);
const routerMyGroup = require(`./myGroups`);

router.use(authentication);

router.use(`/groups`, routerGroup);
router.use(`/myGroups`, routerMyGroup);

module.exports = router;