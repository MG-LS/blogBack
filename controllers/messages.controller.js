const Message = require("../models/Message.model");

module.exports.messagesController = {
  addMessage: async (req, res) => {
    const newMessage = new Message(req.body)

    try {
      const savedMessage = await newMessage.save()
      res.json(savedMessage)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getMessages: async (req, res) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId
      })
      res.json(messages)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}