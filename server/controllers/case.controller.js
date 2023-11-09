const sequalize =require('sequelize')
const {db}= require('../models/index')


module.exports = {
    getAllCases: async function (req, res) {
        try {
            const cases = await db.Case.findAll()
            res.status(200).send(cases)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getCaseById: async function (req, res) {
        try {
            const cases = await db.Case.findAll({
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