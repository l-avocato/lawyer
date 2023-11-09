const express = require('express')
const routerLawyer = express.Router()
const {getAllLawyers,getLawyerId,add,deleteLawyer,update,searchLawyer,searchLawyerByfield,verifyLawyer,blockLawyer,updateAvailability}= require('../controllers/lawyer.controller')


routerLawyer.get('/allLawyers',getAllLawyers)

routerLawyer.get('/getLawyerId/:id',getLawyerId)

routerLawyer.post('/addLawyer',add)

routerLawyer.delete('/deleteLawyer/:id',deleteLawyer)

routerLawyer.put('/updateLawyer/:id',update)

routerLawyer.post('/searchLawyer',searchLawyer)

routerLawyer.post('/searchLawyerByfield',searchLawyerByfield)

routerLawyer.put('/verifyLawyer/:id',verifyLawyer)

routerLawyer.put('/blockLawyer/:id',blockLawyer)

routerLawyer.put('/updateAvailability/:id',updateAvailability)

module.exports = routerLawyer
