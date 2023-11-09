const sequalize =require('sequelize')
const {Case}= require('../models/index')


module.exports = {
    getAllCases: async function (req, res) {
        try {
            const cases = await Case.findAll()
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
    
}