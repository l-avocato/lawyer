const sequalize =require('sequelize')
const {db}= require('../models/index')


module.exports = {

    getAllRatings: async (req,res)=>{
        try {
            const allRatings= await db.Rating.findAll()
            res.status(200).send(allRatings)
        } catch (error) {
            throw error
        
        }
    },
    getRatingId: async (req,res)=>{
        try {
            const oneRating= await db.Rating.findOne({
               where :{id: req.params.id }
            })
            res.status(200).send(oneRating)
        } catch (error) {
            throw error
        }
    },
    
    add: async (req,res)=>{
        try {
            const newRating= await db.Rating.create(req.body)
            res.status(201).send(newRating)
        } catch (error) {
            throw error
        }
    },
    delete: async (req,res)=>{
        try {
            const ratingDeleted= await db.Rating.destroy({
          where:{  id:req.params.id }
            })
            res.send(ratingDeleted)
        } catch (error) {
            throw error
        }
    },
    getRatingByLawyer: async (req,res)=>{
        try {
            const ratingByLawyer= await db.Rating.findAll({
                where:{lawyerId:req.params.id}
            })
            res.send(ratingByLawyer)
        } catch (error) {
            throw error
        }
    },
    getRatingByUser: async (req,res)=>{
        try {
            const ratingByUser= await db.Rating.findAll({
                where:{userId:req.params.id}
            })
            res.send(ratingByUser)
        } catch (error) {
            throw error
        }
    },
    update: async function (req, res) {
        try {
          await db.Rating.update(req.body, {
            where: { id: req.params.id }
          });
      
          const updatedRating = await db.Rating.findByPk(req.params.id);
      
          res.send(updatedRating);
        } catch (error) {
          throw error;
        }
      },
      searchRating: async (req,res)=>{
        try {
            const searchRating= await db.Rating.findAll({
               where :{fullName: req.params.fullName }
            })
            res.status(200).send(searchRating)
        } catch (error) {
            throw error
        }
      },


}