const sequalize =require('sequelize')
const {db}= require('../models/index')


module.exports = {

    getAllCategories: async function (req, res) {
        try {
            const category = await db.Category.findAll()
            res.status(200).send(category)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getCategoryById: async function (req, res) {
        try {
            const category = await db.Category.findAll({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(category)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    addCategory: async function (req, res) {
        try {
            const category = await db.Category.create(req.body)
            res.status(200).send(category)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteCategory: async function (req, res) {
        try {
            const category = await db.Category.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(category)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    updateCategory: async function (req, res) {
        try {
            const category = await db.Category.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(category)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    

}