const express = require('express')
const routerProcess = express.Router()
const { getAllProcess, getProcessId, add, remove, update } = require('../controllers/process.controller')


routerProcess.get('/allProcess', getAllProcess )
routerProcess.get('/note/:id', getProcessId )
routerProcess.post('/addNote', add)
routerProcess.delete('/note/:id', remove)
routerProcess.put('/note/:id', update)

module.exports=routerProcess