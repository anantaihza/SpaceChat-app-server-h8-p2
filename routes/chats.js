const ChatController = require("../controllers/ChatController");
const router = require(`express`).Router();

router.get(`/openai`, ChatController.chatWithOpenAI);

module.exports = router;