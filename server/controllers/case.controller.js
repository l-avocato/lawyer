const sequalize =require('sequelize')
const {Case,User, Lawyer}= require('../models/index')



module.exports = {
    getAllCases: async function (req, res) {
        try {
            const cases = await Case.findAll(
                { include: User }
            )
            res.status(200).send(cases)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getCaseById: async function (req, res) {
        try {
            const cases = await Case.findAll({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(cases)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getCaseByLawyerId: async function (req, res) {
        try {
            const findUser = await Lawyer.findOne({where:{email:req.params.id}})

            const cases = await Case.findAll({
                where: {
                    lawyerId: findUser.id
                },
                include : User
            })
            res.status(200).send(cases)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    addCase: async function (req, res) {
        try {
            const cases = await Case.create(req.body)
            res.status(200).send(cases)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteCase: async function (req, res) {
        try {
            const cases = await Case.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.json(cases)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    updateCase: async function (req, res) {
        try {
            const cases = await Case.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(cases)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getCaseByUserId: async function (req, res) {
        try {
            const cases = await Case.findAll({
                where: {
                    userId: req.params.id
                }
            })
            res.status(200).send(cases)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    
    
}