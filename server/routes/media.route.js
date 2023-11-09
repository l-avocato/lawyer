const express = require('express')
const routerMedia = express.Router()
const {getAllMedia,getMediaById,addMedia,deleteMedia,updateMedia,getMediaByCase,getMediaByLawyer,getMediaByUser,getMediaByPhase,getMediaByConversation} =require('../controllers/media.controller')

routerMedia.get('/allMedia',getAllMedia)

routerMedia.get('/getMediaById/:id',getMediaById)

routerMedia.post('/addMedia',addMedia)

routerMedia.delete('/deleteMedia/:id',deleteMedia)

routerMedia.put('/updateMedia/:id',updateMedia)

routerMedia.get('/getMediaByCase/:id',getMediaByCase)

routerMedia.get('/getMediaByLawyer/:id',getMediaByLawyer)

routerMedia.get('/getMediaByUser/:id',getMediaByUser)

routerMedia.get('/getMediaByPhase/:id',getMediaByPhase)

routerMedia.get('/getMediaByConversation/:id',getMediaByConversation)

module.exports = routerMedia