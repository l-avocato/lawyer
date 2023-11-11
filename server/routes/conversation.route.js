const express = require('express')
const routerConversation = express.Router()
const {getAllConversations,getConversationById,addConversation,deleteConversation,updateConversation,getConversationByLawyer,getConversationByUser}= require('../controllers/conversation.controller')


routerConversation.get('/allConversations',getAllConversations)

routerConversation.get('/getConversationById/:id',getConversationById)

routerConversation.post('/addConversation',addConversation)

routerConversation.delete('/deleteConversation/:id',deleteConversation)

routerConversation.put('/updateConversation/:id',updateConversation)

routerConversation.get('/getConversationByLawyer/:id',getConversationByLawyer)

routerConversation.get('/getConversationByUser/:id',getConversationByUser)

module.exports = routerConversation