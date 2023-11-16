const sequalize =require('sequelize')
const {Payment,User,Lawyer}= require('../models/index')


module.exports = {

    getAllPayments: async (req,res)=>{
        try {
            const allPayments= await Payment.findAll({
                include:[User,Lawyer]
            })
            res.status(200).send(allPayments)
        } catch (error) {
            throw error
        
        }
    },
    getPaymentId: async (req,res)=>{
        try {
            const onePayment= await Payment.findOne({
               where :{id: req.params.id },
               include:[User,Lawyer]
            })
            res.status(200).send(onePayment)
        } catch (error) {
            throw error
        }
    },
    
    add: async (req,res)=>{
        try {
            const newPayment= await Payment.create(req.body)
            res.status(201).send(newPayment)
        } catch (error) {
            throw error
        }
    },
    deletePayment: async (req,res)=>{
        try {
            const paymentDeleted= await Payment.destroy({
          where:{  id:req.params.id }
            })
            res.json(paymentDeleted)
        } catch (error) {
            throw error
        }
    },
    update: async function (req, res) {
        try {
          await Payment.update(req.body, {
            where: { id: req.params.id }
          });
      
          const updatedPayment = await Payment.findByPk(req.params.id);
      
          res.send(updatedPayment);
        } catch (error) {
          throw error;
        }
      },
      searchPaymentByUser: async (req,res)=>{
        try {
            const searchPayment= await Payment.findAll({
                where :{UserId: req.params.id }
            })
            res.status(200).send(searchPayment)
        } catch (error) {
            throw error
        }
       
      },
      

    }