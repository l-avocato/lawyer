const express = require('express')
const routerPhase = express.Router()
const {getAllPhases,getPhaseId,add,remove,update}= require('../controllers/phase.controller')

routerPhase.get('/allPhase',getAllPhases)
routerPhase.get('/PhaseId/:id',getPhaseId)
routerPhase.post('/add',add)
routerPhase.delete('/remove/:id',remove)
routerPhase.put('/update/:id',update)









module.exports=routerPhase