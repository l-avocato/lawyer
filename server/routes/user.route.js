const express = require('express')
const routerUser = express.Router()
const {getAllUsers,getUserId,add,deleteUser,update,searchUser,searchUserByCIN,blockUser,getUserByEmail}= require('../controllers/user.controller')

routerUser.get('/allUsers',getAllUsers)

routerUser.get('/getUserId/:id',getUserId)

routerUser.post('/addUser',add)

routerUser.delete('/deleteUser/:id',deleteUser)

routerUser.put('/updateUser/:id',update)

routerUser.post('/searchUser',searchUser)

routerUser.post('/searchUserByCIN',searchUserByCIN)

routerUser.put('/blockUser/:id',blockUser)

routerUser.get('/getUserByEmail/:email',getUserByEmail)

module.exports = routerUser