const express = require('express')
const routerTaskList = express.Router()
const {getAllTasks,getTaskId,add,deleteTask,update,searchTask,searchTaskByClient,searchTaskByUser,searchTaskByPhase,searchTaskByCase,completeTask,updateTaskDeadline}= require('../controllers/taskilist.controller')

routerTaskList.get('/allTasks',getAllTasks)

routerTaskList.get('/getTaskId/:id',getTaskId)

routerTaskList.post('/addTask',add)

routerTaskList.delete('/deleteTask/:id',deleteTask)

routerTaskList.put('/updateTask/:id',update)

routerTaskList.post('/searchTask',searchTask)

routerTaskList.post('/searchTaskByClient',searchTaskByClient)

routerTaskList.post('/searchTaskByUser',searchTaskByUser)

routerTaskList.post('/searchTaskByPhase',searchTaskByPhase)

routerTaskList.post('/searchTaskByCase',searchTaskByCase)

routerTaskList.put('/completeTask/:id',completeTask)

routerTaskList.put('/updateTaskDeadline/:id',updateTaskDeadline)

module.exports = routerTaskList