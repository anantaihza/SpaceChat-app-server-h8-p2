const chatOpenAI = require("../helpers/openai");

class ChatController {
    static async chatWithOpenAI(req, res, next) {
        try {
            const { inputPrompt } = req.body;

            const result = await chatOpenAI(inputPrompt);

            res.status(200).json({result});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ChatController;