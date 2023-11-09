const express = require('express')
const routerAvailability = express.Router()
const {getAllAvalabilities,getAvailabilityById,addAvailability,deleteAvailability,updateAvailability,getAvailabilityByLawyerId} = require('../controllers/availability.controller')


routerAvailability.get('/allAvailabilities',getAllAvalabilities)

routerAvailability.get('/availability/:id', getAvailabilityById)

routerAvailability.post('/addAvailability', addAvailability)

routerAvailability.delete('/deleteAvailability/:id', deleteAvailability)

routerAvailability.put('/updateAvailability/:id', updateAvailability)

routerAvailability.get('/availability/lawyer/:id', getAvailabilityByLawyerId)




module.exports=routerAvailability