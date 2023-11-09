const express = require('express')
const routerChat = express.Router()
const {getAllChats,getChatById,addChat,deleteChat,updateChat,getChatByLawyer,getChatByConversation}= require('../controllers/chats.controller')

routerChat.get('/allChats',getAllChats)

routerChat.get('/getChatById/:id',getChatById)

routerChat.post('/addChat',addChat)

routerChat.delete('/deleteChat/:id',deleteChat)

routerChat.put('/updateChat/:id',updateChat)

routerChat.get('/getChatByLawyer/:id',getChatByLawyer)

routerChat.get('/getChatByConversation/:id',getChatByConversation)

module.exports = routerChat