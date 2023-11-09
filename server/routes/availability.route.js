const express = require('express')
const routerAvailability = express.Router()
const {getAllAvalabilities,getAvailabilityById,addAvailability,deleteAvailability,updateAvailability,getAvailabilityByLawyerId} = require('../controllers/availability.controller')


routerAvailability.get('/allAvailabilities')







module.exports=routerAvailability