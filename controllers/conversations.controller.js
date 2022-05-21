const Conversation = require("../models/Conversation.model");

module.exports.conversationsController = {
  addConversation: async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId]
    })

    try {
      const savedConversation = await newConversation.save()
      res.json(savedConversation)
    } catch (error) {
      res.status(500).json(err)
    }
  },
  getConversations: async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in:[req.params.userId] }
      })
      res.json(conversation)
    } catch (error) {
      
    }
  }
}