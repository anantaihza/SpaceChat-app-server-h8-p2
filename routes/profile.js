const UserController = require("../controllers/UserController");
const router = require(`express`).Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.put("/:id", upload.single("avatar"), UserController.updateProfile);

module.exports = router;
