const sequalize =require('sequelize')
const {Availability,Appointment}= require('../models/index')



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
         
          const isAvailable = await Availability.findOne({
            where: {
              lawyerId: req.body.lawyerId,
              date: req.body.date,
              time: req.body.time,
            },
          });
      
          if (!isAvailable) {

            const appointment = await Appointment.create({
              date: req.body.date,
              time: req.body.time,
              reason: req.body.reason,
            });
      
      
            await Availability.create({
              date: req.body.date,
              time: req.body.time,
              available: false,
              lawyerId: req.body.lawyerId,
            });
      
            res.status(200).send(appointment);
          } else {
   
            res.status(400).send({
              error: "The requested time is not available.",
            });
          }
        } catch (error) {
          res.status(500).send({
            error: error.message,
          });
        }
      }, 
      getUnavailableTimes: async function (req, res) {
        try {
          const { lawyerId, date } = req.params;
      
          const unavailableTimes = await Availability.findAll({
            attributes: ['time'],
            where: {
              lawyerId: parseInt(lawyerId),
              date: new Date(date),
              available: false,
            },
          });
      
      
          const times = unavailableTimes.map(item => item.time);
      
          console.log(req.body, req.params, times, "check");
      
          res.status(200).send(times);
        } catch (error) {
          res.status(500).send({
            error: error.message,
          });
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