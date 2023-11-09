const express = require('express')
const routerPayment = express.Router()
const {getAllPayments,getPaymentId,add,deletePayment,update,searchPaymentByUser}= require('../controllers/payment.controller')

routerPayment.get('/allPayments',getAllPayments)

routerPayment.get('/getPaymentId/:id',getPaymentId)

routerPayment.post('/addPayment',add)

routerPayment.delete('/deletePayment/:id',deletePayment)

routerPayment.put('/updatePayment/:id',update)

routerPayment.post('/searchPaymentByUser',searchPaymentByUser)

module.exports = routerPayment