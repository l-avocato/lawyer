const sequalize =require('sequelize')
const {db}= require('../models/index')

module.exports = {

    getAllLawyers : async () => {
        try {
            const allLawyers= await db.Lawyer.findAll()
            res.status(200).send(allLawyers)
        } catch (error) {
            throw error
        
        }
     },
     getLawyerId: async (req,res)=>{
        try {
            const oneLawyer= await db.Lawyer.findOne({
               where :{id: req.params.id }
            })
            res.status(200).send(oneLawyer)
        } catch (error) {
            throw error
        }
     },
    
     add: async (req,res)=>{
        try {
            const newLawyer= await db.Lawyer.create(req.body)
            res.status(201).send(newLawyer)
        } catch (error) {
            throw error
        }
     },
    delete: async (req,res)=>{
        try {
            const lawyerDeleted= await db.Lawyer.destroy({
          where:{  id:req.params.id }
            })
            res.send(lawyerDeleted)
        } catch (error) {
            throw error
        }
    },
    update: async (req, res) =>{
        try {
          await db.User.update(req.body, {
            where: { id: req.params.id }
          });
      
          const updatedLawyer = await db.Lawyer.findByPk(req.params.id);
      
          res.send(updatedLawyer);
        } catch (error) {
          throw error;
        }
      },
      
      searchLawyer: async (req,res)=>{
        try {
            const searchLawyer= await db.Lawyer.findAll({
               where :{fullName: req.params.fullName }
            })
            res.status(200).send(searchLawyer)
        } catch (error) {
            throw error
        }
      },
        searchLawyerByfield: async (req,res)=>{
            try {
                const searchLawyer= await db.Lawyer.findAll({
                 where :{field: req.params.field }
                })
                res.status(200).send(searchLawyer)
            } catch (error) {
                throw error
            }
        },
        verifyLawyer: async (req,res)=>{
            try {
                const lawyerVerified= await db.Lawyer.update({
                    IsVerified: true
                },{
                    where: {id: req.params.id}
                })
                res.status(200).send(lawyerVerified)
            } catch (error) {
                throw error
            }
        },
        blockLawyer: async (req,res)=>{
            try {
                const lawyerBlocked= await db.Lawyer.update({
                    IsBlocked: true
                },{
                    where: {id: req.params.id}
                })
                res.status(200).send(lawyerBlocked)
            } catch (error) {
                throw error
            }
        },
        updateAvailability: async (req,res)=>{
            try {
                const lawyerAvailabilityUpdated= await db.Lawyer.update({
                    isAvailable: req.body.isAvailable
                },{
                    where: {id: req.params.id}
                })
                res.status(200).send(lawyerAvailabilityUpdated)
            } catch (error) {
                throw error
            }
        }

    }
    