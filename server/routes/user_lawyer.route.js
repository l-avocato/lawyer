const express = require('express')
const routerUser_Lawyer = express.Router()
const {add,getUserLawyerId,getClientsByLawyerId}= require('../controllers/user_lawyer.controller')


routerUser_Lawyer.post('/addUser_Lawyer',add)


routerUser_Lawyer.get('/getClientsByLawyerId/:lawyerId',getClientsByLawyerId)

routerUser_Lawyer.get('/getUserLawyerId/:userId/:lawyerId',getUserLawyerId)


module.exports = routerUser_Lawyer;