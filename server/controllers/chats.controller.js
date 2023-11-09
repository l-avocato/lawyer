const sequalize =require('sequelize')
const {Chat}= require('../models/index')


module.exports = {

    getAllChats: async function (req, res) {
        try {
            const chat = await Chat.findAll()
            res.status(200).send(chat)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getChatById: async function (req, res) {
        try {
            const chat = await Chat.findAll({
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
            const chat = await Chat.create(req.body)
            res.status(200).send(chat)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteChat: async function (req, res) {
        try {
            const chat = await Chat.destroy({
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
            const chat = await Chat.update(req.body, {
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
            const chat = await Chat.findAll({
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
            const chat = await Chat.findAll({
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