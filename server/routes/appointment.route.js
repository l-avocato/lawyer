const express = require('express')
const routerAppointment = express.Router()
const {getAllAppointments,getAppointmentById,addAppointment,deleteAppointment,updateAppointment,getAppointmentByLawyerId,getAppointmentByUserId,getAppointmentByCaseId,getAppointmentByDate,getAppointmentByTime,getAppointmentByStatus,getAppointmentByReason} = require('../controllers/appointment.controller')


routerAppointment.get('/getAppointments',getAllAppointments)
routerAppointment.get('/appointment/:id', getAppointmentById)
routerAppointment.post('/addAppointment', addAppointment)
routerAppointment.delete('/deleteAppointment/:id', deleteAppointment)
routerAppointment.put('/updateAppointment/:id', updateAppointment)
routerAppointment.get('/appointment/lawyer/:id', getAppointmentByLawyerId)
routerAppointment.get('/appointment/user/:id', getAppointmentByUserId)
routerAppointment.get('/appointment/case/:id', getAppointmentByCaseId)
routerAppointment.get('/appointment/date/:date', getAppointmentByDate)
routerAppointment.get('/appointment/time/:time', getAppointmentByTime)
routerAppointment.get('/appointment/status/:accepted', getAppointmentByStatus)


module.exports=routerAppointment