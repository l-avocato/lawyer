const express = require('express')
const routerReport = express.Router()
const {getAllReports,getReportId,add,deleteReport}= require('../controllers/report.controller')

routerReport.get('/allReports',getAllReports)

routerReport.get('/getReportId/:id',getReportId)

routerReport.post('/addReport',add)

routerReport.delete('/deleteReport/:id',deleteReport)

module.exports = routerReport