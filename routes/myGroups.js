const GroupController = require("../controllers/GroupController");
const router = require(`express`).Router();

router.get(`/`, GroupController.fetchMyGroups);
router.post(`/groupId`, GroupController.joinGroup);

module.exports = router;