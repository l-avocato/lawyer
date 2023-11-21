const express = require('express')
const routerAvailability = express.Router()
const {getAllAvalabilities,getAvailabilityById,addAvailability,deleteAvailability,updateAvailability,getAvailabilityByLawyerId,getUnavailableTimes} = require('../controllers/availability.controller')


routerAvailability.get('/allAvailabilities',getAllAvalabilities)

routerAvailability.get('/availability/:id', getAvailabilityById)

routerAvailability.post('/addAvailability', addAvailability)
routerAvailability.get("/unavaibleTime/:lawyerId/:date",getUnavailableTimes)

routerAvailability.delete('/deleteAvailability/:id', deleteAvailability)

routerAvailability.put('/updateAvailability/:id', updateAvailability)

routerAvailability.get('/availability/lawyer/:id', getAvailabilityByLawyerId)




module.exports=routerAvailability