const { Router } = require("express");
const { conversationsController } = require("../controllers/conversations.controller");

const router = Router()

router.post("/conversation", conversationsController.addConversation)
router.get("/conversation/:userId", conversationsController.getConversations)

module.exports = router