const sequalize =require('sequelize')
const {db}= require('../models/index')


module.exports = {

    getAllPayments: async (req,res)=>{
        try {
            const allPayments= await db.Payment.findAll()
            res.status(200).send(allPayments)
        } catch (error) {
            throw error
        
        }
    },
    getPaymentId: async (req,res)=>{
        try {
            const onePayment= await db.Payment.findOne({
               where :{id: req.params.id }
            })
            res.status(200).send(onePayment)
        } catch (error) {
            throw error
        }
    },
    
    add: async (req,res)=>{
        try {
            const newPayment= await db.Payment.create(req.body)
            res.status(201).send(newPayment)
        } catch (error) {
            throw error
        }
    },
    delete: async (req,res)=>{
        try {
            const paymentDeleted= await db.Payment.destroy({
          where:{  id:req.params.id }
            })
            res.send(paymentDeleted)
        } catch (error) {
            throw error
        }
    },
    update: async function (req, res) {
        try {
          await db.Payment.update(req.body, {
            where: { id: req.params.id }
          });
      
          const updatedPayment = await db.Payment.findByPk(req.params.id);
      
          res.send(updatedPayment);
        } catch (error) {
          throw error;
        }
      },
      searchPaymentByUser: async (req,res)=>{
        try {
            const searchPayment= await db.Payment.findAll({
                where :{UserId: req.params.id }
            })
            res.status(200).send(searchPayment)
        } catch (error) {
            throw error
        }
       
      },
      

    }