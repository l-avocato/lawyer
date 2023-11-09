const sequalize =require('sequelize')
const {Availability}= require('../models/index')



module.exports = {
    getAllAvalabilities: async function (req, res) {
        try {
            const availability = await Availability.findAll()
            res.status(200).send(availability)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAvailabilityById: async function (req, res) {
        try {
            const availability = await Availability.findAll({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(availability)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    addAvailability: async function (req, res) {
        try {
            const availability = await Availability.create(req.body)
            res.status(200).send(availability)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteAvailability: async function (req, res) {
        try {
            const availability = await Availability.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(availability)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    updateAvailability: async function (req, res) {
        try {
            const availability = await Availability.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(availability)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAvailabilityByLawyerId: async function (req, res) {
        try {
            const availability = await Availability.findAll({
                where: {
                    LawyerId: req.params.LawyerId
                }
            })
            res.status(200).send(availability)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    
}