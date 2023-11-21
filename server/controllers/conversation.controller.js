const sequalize =require('sequelize')
const {Conversation}= require('../models/index')
const { v4: uuidv4 } = require('uuid');


module.exports = {
    getAllConversations: async function (req, res) {
        try {
            const conversation = await Conversation.findAll()
            res.status(200).send(conversation)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getConversationById: async function (req, res) {
        try {
            const conversation = await Conversation.findAll({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(conversation)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    // addConversation: async function (req, res) {
    //     try {
    //         const conversation = await Conversation.create(req.body)
    //         res.status(200).send(conversation)
    //     } catch (error) {
    //         res.status(500).send({
    //             error: error.message
    //         })
    //     }
    // },
    addConversation: async function (req, res) {
        try {
          // Generate a unique roomId using uuid
          const roomId = uuidv4();
    
          // Create a new conversation with the generated roomId
          const conversation = await Conversation.create({
            ...req.body,
            roomId: roomId,
          });
    
          res.status(200).send(conversation);
        } catch (error) {
          res.status(500).send({
            error: error.message,
          });
        }
      },
    deleteConversation: async function (req, res) {
        try {
            const conversation = await Conversation.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(conversation)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    updateConversation: async function (req, res) {
        try {
            const conversation = await Conversation.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(conversation)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getConversationByLawyer: async function (req, res) {
        try {
            const conversation = await Conversation.findAll({
                where: {
                    lawyerId: req.params.id
                }
            })
            res.status(200).send(conversation)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getConversationByUser: async function (req, res) {
        try {
            const conversation = await Conversation.findAll({
                where: {
                    userId: req.params.id
                }
            })
            res.status(200).send(conversation)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },

}