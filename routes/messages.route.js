const { Router } = require("express");
const { messagesController } = require("../controllers/messages.controller");

const router = Router()

router.post("/messages", messagesController.addMessage)
router.get("/messages/:conversationId", messagesController.getMessages)

module.exports = router