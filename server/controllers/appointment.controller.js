const sequalize =require('sequelize')
const {db}= require('../models/index')


module.exports = {

    getAllAppointments: async function (req, res) {
        try {
            const appointment = await db.Appointment.findAll()
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAppointmentById: async function (req, res) {
        try {
            const appointment = await db.Appointment.findAll({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },  
    addAppointment: async function (req, res) {
        try {
            const appointment = await db.Appointment.create(req.body)
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteAppointment: async function (req, res) {
        try {
            const appointment = await db.Appointment.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    updateAppointment: async function (req, res) {
        try {
            const appointment = await db.Appointment.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAppointmentByLawyerId: async function (req, res) {
        try {
            const appointment = await db.Appointment.findAll({
                where: {
                    lawyerId: req.params.id
                }
            })
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAppointmentByUserId: async function (req, res) {
        try {
            const appointment = await db.Appointment.findAll({
                where: {
                    userId: req.params.id
                }
            })
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAppointmentByCaseId: async function (req, res) {
        try {
            const appointment = await db.Appointment.findAll({
                where: {
                    caseId: req.params.id
                }
            })
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAppointmentByDate: async function (req, res) {
        try {
            const appointment = await db.Appointment.findAll({
                where: {
                    date: req.params.date
                }
            })
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAppointmentByTime: async function (req, res) {
        try {
            const appointment = await db.Appointment.findAll({
                where: {
                    time: req.params.time
                }
            })
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAppointmentByStatus: async function (req, res) {
        try {
            const appointment = await db.Appointment.findAll({
                where: {
                    accepted: req.params.accepted
                }
            })
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAppointmentByReason: async function (req, res) {
        try {
            const appointment = await db.Appointment.findAll({
                where: {
                    reason: req.params.reason
                }
            })
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },


}