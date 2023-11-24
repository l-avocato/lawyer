const sequalize =require('sequelize')
const {TaskList}= require('../models/index')


module.exports = {
    
    getAllTasks : async (req,res) => {
        try {
            const allTasks= await TaskList.findAll({})
            res.status(200).send(allTasks)
        } catch (error) {
            throw error
        
        }
    },
    getTaskId: async (req,res)=>{
        try {
            const oneTask= await TaskList.findOne({
               where :{id: req.params.id }
            })
            res.status(200).send(oneTask)
        } catch (error) {
            throw error
        }
    },
    
    add: async (req,res)=>{
        try {
            const newTask= await TaskList.create(req.body)
            res.status(201).send(newTask)
        } catch (error) {
            throw error
        }
    },
    deleteTask: async (req,res)=>{
        try {
         const taskDeleted=   await TaskList.destroy({
          where:{  id:req.params.id }
            })
     res.json(taskDeleted)
        } catch (error) {
            throw error
        }
    },
    update: async function (req, res) {
        try {
          await TaskList.update(req.body, {
            where: { id: req.params.id }
          });
      
          const updatedTask = await TaskList.findByPk(req.params.id);
      
          res.send(updatedTask);
        } catch (error) {
          throw error;
        }
      },
      searchTask: async (req,res)=>{
        try {
            const searchTask= await TaskList.findAll({
                where: {name: req.params.name}
            })
            res.status(200).send(searchTask)
        } catch (error) {
            throw error
        }
    },

    searchTaskByClient: async (req,res)=>{
        try {
            const searchTask= await TaskList.findAll({
                where: {userId: req.params.userId}
            })
            res.status(200).send(searchTask)
        } catch (error) {
            throw error
        }
    },
    searchTaskByUser: async (req,res)=>{
        try {
            const searchTask= await TaskList.findAll({
                where: {userId: req.params.userId}
            })
            res.status(200).send(searchTask)
        } catch (error) {
            throw error
        }
    },
    searchTaskByPhase: async (req,res)=>{
        try {
            const searchTask= await TaskList.findAll({
                where: {phaseId: req.params.phaseId}
            })
            res.status(200).send(searchTask)
        } catch (error) {
            throw error
        }
    },
    searchTaskByCase: async (req,res)=>{
        try {
            const searchTask= await TaskList.findAll({
                where: {caseId: req.params.caseId}
            })
            res.status(200).send(searchTask)
        } catch (error) {
            throw error
        }
    },
    completeTask: async (req,res)=>{
        try {
            const taskCompleted= await TaskList.update({
                isCompleted: true
            },{
                where: {id: req.params.id}
            })
            res.status(200).send(taskCompleted)
        } catch (error) {
            throw error
        }
    },
    updateTaskDeadline: async (req,res)=>{
        try {
            const taskDeadlineUpdated= await TaskList.update({
                deadline: req.body.deadline
            },{
                where: {id: req.params.id}
            })
            res.status(200).send(taskDeadlineUpdated)
        } catch (error) {
            throw error
        }
    },


}