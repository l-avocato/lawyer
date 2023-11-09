const express = require('express')
const routerReceipt = express.Router()
const {getAllReceipts,getReceiptId,add,deleteReceipt}= require('../controllers/receipt.controller')

routerReceipt.get('/allReceipts',getAllReceipts)

routerReceipt.get('/getReceiptId/:id',getReceiptId)

routerReceipt.post('/addReceipt',add)

routerReceipt.delete('/deleteReceipt/:id',deleteReceipt)

module.exports = routerReceipt
