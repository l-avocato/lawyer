const express = require('express')
const routerUser_Lawyer = express.Router()
const {add}= require('../controllers/user_lawyer.controller')


routerUser_Lawyer.post('/addUser_Lawyer',add)

module.exports = routerUser_Lawyer;