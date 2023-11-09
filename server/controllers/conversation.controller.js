const sequalize =require('sequelize')
const {db}= require('../models/index')


module.exports = {
    getAllConversations: async function (req, res) {
        try {
            const conversation = await db.Conversation.findAll()
            res.status(200).send(conversation)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getConversationById: async function (req, res) {
        try {
            const conversation = await db.Conversation.findAll({
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
    addConversation: async function (req, res) {
        try {
            const conversation = await db.Conversation.create(req.body)
            res.status(200).send(conversation)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteConversation: async function (req, res) {
        try {
            const conversation = await db.Conversation.destroy({
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
            const conversation = await db.Conversation.update(req.body, {
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
            const conversation = await db.Conversation.findAll({
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
            const conversation = await db.Conversation.findAll({
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