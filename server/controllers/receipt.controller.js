const sequalize =require('sequelize')
const {db}= require('../models/index')


module.exports = {

    getAllReceipts: async (req,res)=>{
        try {
            const allReceipts= await db.Receipt.findAll()
            res.status(200).send(allReceipts)
        } catch (error) {
            throw error
        
        }
    },
    getReceiptId: async (req,res)=>{
        try {
            const oneReceipt= await db.Receipt.findOne({
               where :{id: req.params.id }
            })
            res.status(200).send(oneReceipt)
        } catch (error) {
            throw error
        }
    },
    
    add: async (req,res)=>{
        try {
            const newReceipt= await db.Receipt.create(req.body)
            res.status(201).send(newReceipt)
        } catch (error) {
            throw error
        }
    },
    delete: async (req,res)=>{
        try {
            const receiptDeleted= await db.Receipt.destroy({
          where:{  id:req.params.id }
            })
            res.send(receiptDeleted)
        } catch (error) {
            throw error
        }
    },
    

}