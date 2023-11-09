const sequalize =require('sequelize')
const {Media}= require('../models/index')


module.exports = {

    getAllMedia: async function (req, res) {
        try {
            const media = await Media.findAll()
            res.status(200).send(media)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getMediaById: async function (req, res) {
        try {
            const media = await Media.findAll({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(media)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    addMedia: async function (req, res) {
        try {
            const media = await Media.create(req.body)
            res.status(200).send(media)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteMedia: async function (req, res) {
        try {
            const media = await Media.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(media)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    updateMedia: async function (req, res) {
        try {
            const media = await Media.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(media)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getMediaByCase: async function (req, res) {
        try {
            const media = await Media.findAll({
                where: {
                    caseId: req.params.id
                }
            })
            res.status(200).send(media)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getMediaByLawyer: async function (req, res) {
        try {
            const media = await Media.findAll({
                where: {
                    lawyerId: req.params.id
                }
            })
            res.status(200).send(media)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getMediaByUser: async function (req, res) {
        try {
            const media = await Media.findAll({
                where: {
                    userId: req.params.id
                }
            })
            res.status(200).send(media)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getMediaByPhase: async function (req, res) {
        try {
            const media = await Media.findAll({
                where: {
                    phaseId: req.params.id
                }
            })
            res.status(200).send(media)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getMediaByConversation: async function (req, res) {
        try {
            const media = await Media.findAll({
                where: {
                    conversationId: req.params.id
                }
            })
            res.status(200).send(media)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    

}