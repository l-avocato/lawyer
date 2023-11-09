const sequalize =require('sequelize')
const {Admin}= require('../models/index')


module.exports = {

    getAllAdmins: async function (req, res) {
        try {
            const admins = await Admin.findAll()
            res.status(200).send(admins)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAdminById: async function (req, res) {
        try {
            const admins = await Admin.findAll({
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
            const admins = await Admin.create(req.body)
            res.status(200).send(admins)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteAdmin: async function (req, res) {
        try {
            const admins = await Admin.destroy({
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
            const admins = await Admin.update(req.body, {
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