const sequalize =require('sequelize')
const {Report}= require('../models/index')


module.exports = {

    getAllReports: async (req,res)=>{
        try {
            const allReports= await Report.findAll()
            res.status(200).send(allReports)
        } catch (error) {
            throw error
        
        }
    },
    getReportId: async (req,res)=>{
        try {
            const oneReport= await Report.findOne({
               where :{id: req.params.id }
            })
            res.status(200).send(oneReport)
        } catch (error) {
            throw error
        }
    },
    
    add: async (req,res)=>{
        try {
            const newReport= await Report.create(req.body)
            res.status(201).send(newReport)
        } catch (error) {
            throw error
        }
    },
    delete: async (req,res)=>{
        try {
            const reportDeleted= await Report.destroy({
          where:{  id:req.params.id }
            })
            res.send(reportDeleted)
        } catch (error) {
            throw error
        }
    },
    

}