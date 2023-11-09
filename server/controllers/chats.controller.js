const sequalize =require('sequelize')
const {db}= require('../models/index')


module.exports = {

    getAllChats: async function (req, res) {
        try {
            const chat = await db.Chat.findAll()
            res.status(200).send(chat)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getChatById: async function (req, res) {
        try {
            const chat = await db.Chat.findAll({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(chat)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    addChat: async function (req, res) {
        try {
            const chat = await db.Chat.create(req.body)
            res.status(200).send(chat)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteChat: async function (req, res) {
        try {
            const chat = await db.Chat.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(chat)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    updateChat: async function (req, res) {
        try {
            const chat = await db.Chat.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(chat)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getChatByLawyer: async function (req, res) {
        try {
            const chat = await db.Chat.findAll({
                where: {
                    lawyerId: req.params.id
                }
            })
            res.status(200).send(chat)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getChatByConversation: async function (req, res) {
        try {
            const chat = await db.Chat.findAll({
                where: {
                    conversationId: req.params.id
                }
            })
            res.status(200).send(chat)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    }

}