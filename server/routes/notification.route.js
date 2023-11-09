const express = require('express')
const routerNotification = express.Router()
const {addNotification,deleteNotification,updateNotification,getAllNotifications,getNotificationById,getNotificationsByUser,getNotificationsByLawyer}= require('../controllers/notification.controller')

routerNotification.get('/allNotifications',getAllNotifications)

routerNotification.get('/getNotificationById/:id',getNotificationById)

routerNotification.post('/addNotification',addNotification)

routerNotification.delete('/deleteNotification/:id',deleteNotification)

routerNotification.put('/updateNotification/:id',updateNotification)

routerNotification.get('/getNotificationsByUser/:id',getNotificationsByUser)

routerNotification.get('/getNotificationsByLawyer/:id',getNotificationsByLawyer)

module.exports = routerNotification