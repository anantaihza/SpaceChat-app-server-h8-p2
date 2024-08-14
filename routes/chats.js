const ChatController = require("../controllers/ChatController");
const router = require(`express`).Router();

router.post(`/openai`, ChatController.chatWithOpenAI);

module.exports = router;
