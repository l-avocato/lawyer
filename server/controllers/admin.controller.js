const sequalize =require('sequelize')
const {db}= require('../models/index')


module.exports = {

    getAllAdmins: async function (req, res) {
        try {
            const admins = await db.Admin.findAll()
            res.status(200).send(admins)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAdminById: async function (req, res) {
        try {
            const admins = await db.Admin.findAll({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(admins)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    addAdmin: async function (req, res) {
        try {
            const admins = await db.Admin.create(req.body)
            res.status(200).send(admins)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteAdmin: async function (req, res) {
        try {
            const admins = await db.Admin.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(admins)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    updateAdmin: async function (req, res) {
        try {
            const admins = await db.Admin.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(admins)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    }

}