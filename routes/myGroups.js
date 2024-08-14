const GroupController = require("../controllers/GroupController");
const router = require(`express`).Router();

router.get(`/`, GroupController.fetchMyGroups);
router.post(`/:groupId`, GroupController.joinGroup);
router.get(`/:groupId/detail`, GroupController.detailGroup);

module.exports = router;
