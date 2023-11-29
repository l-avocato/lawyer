const express = require('express')
const routerPhase = express.Router()
const {getAllPhases,getPhaseId,add,remove,update,getPhasesByLawyerId,updatePhase}= require('../controllers/phase.controller')

routerPhase.get('/allPhase/:id',getAllPhases)
routerPhase.get('/PhaseId/:id',getPhaseId)
routerPhase.post('/add',add)
routerPhase.delete('/remove/:id',remove)
routerPhase.put('/update/:id',update)
routerPhase.get('/getPhasesByLawyerId/:id',getPhasesByLawyerId)
routerPhase.put('/updatePhase/:id',updatePhase)









module.exports=routerPhase