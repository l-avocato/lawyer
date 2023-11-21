const sequalize =require('sequelize')
const {Appointment,User}= require('../models/index')


module.exports = {

    getAllAppointments: async function (req, res) {
        try {
            const appointment = await Appointment.findAll({
                include:User
            })
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    getAppointmentById: async function (req, res) {
        try {
            const appointment = await Appointment.findAll({
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
            const findUser = await User.findOne({where:{email:req.body.email}})
            const appointment = await Appointment.create({...req.body,userId:findUser.id})
            res.status(200).send(appointment)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteAppointment: async function (req, res) {
        try {
            const appointment = await Appointment.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.json(appointment)
        } catch (error) {
           console.log(error);
        }
    },
    updateAppointment: async function (req, res) {
        try {
            const appointment = await Appointment.update(req.body, {
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
          const appointment = await Appointment.findAll({
            where: {
              lawyerId: req.params.id,
              accepted: "pending"
            },
          
          })
          res.status(200).send(appointment)
        } catch (error) {
          res.status(500).send({
            error: error.message
          })
        }
      },
    getAppointmentUpcoming: async function (req, res) {
        try {
            
            const appointment = await Appointment.findAll({
                where: {
                    lawyerId: req.params.id,
                    accepted: "accepted"
                },
                order: [
                    ['date', 'DESC'],
                    ['time', 'ASC']
                  ],
                include:User
                
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
            const appointment = await Appointment.findAll({
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
            const appointment = await Appointment.findAll({
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
            const appointment = await Appointment.findAll({
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
            const appointment = await Appointment.findAll({
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
            const appointment = await Appointment.findAll({
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
            const appointment = await Appointment.findAll({
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