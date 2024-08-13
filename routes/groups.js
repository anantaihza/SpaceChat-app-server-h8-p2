const GroupController = require("../controllers/GroupController");
const router = require(`express`).Router();

router.get(`/`, GroupController.fetchGroups);

module.exports = router;