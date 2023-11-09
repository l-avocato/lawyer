const express = require('express')
const routerCase = express.Router()
const {getAllCases,getCaseById,getCaseByLawyerId,addCase,deleteCase,updateCase,getCaseByUserId}= require('../controllers/case.controller')


routerCase.get('/allCases',getAllCases)

routerCase.get('/case/:id', getCaseById)

routerCase.get('/case/lawyer/:id', getCaseByLawyerId)

routerCase.post('/addCase', addCase)

routerCase.delete('/deleteCase/:id', deleteCase)

routerCase.put('/updateCase/:id', updateCase)

routerCase.get('/case/user/:id', getCaseByUserId)

module.exports = routerCase
