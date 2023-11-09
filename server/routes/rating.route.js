const express = require('express')
const routerRating = express.Router()
const {getAllRatings,getRatingId,add,deleteRating,getRatingByLawyer,getRatingByUser,update,searchRating}= require('../controllers/rating.controller')

routerRating.get('/allRatings',getAllRatings)

routerRating.get('/getRatingId/:id',getRatingId)

routerRating.post('/addRating',add)

routerRating.delete('/deleteRating/:id',deleteRating)

routerRating.put('/updateRating/:id',update)

routerRating.get('/getRatingByLawyer/:id',getRatingByLawyer)

routerRating.get('/getRatingByUser/:id',getRatingByUser)

routerRating.post('/searchRating',searchRating)

module.exports = routerRating
