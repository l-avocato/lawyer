const sequalize =require('sequelize')
const {db}= require('../models/index')


module.exports = {

    getAllPhases: async (req,res)=>{
        try {
            const allPhases= await db.Phase.findAll({})
            res.status(200).send(allPhases)
        } catch (error) {
            throw error
        
        }
    },
    getPhaseId: async (req,res)=>{
        try {
            const onePhase= await db.Phase.findOne({
               where :{id: req.params.id }
            })
            res.status(200).send(onePhase)
        } catch (error) {
            throw error
        }
    },
    
    add: async (req,res)=>{
        try {
            const newPhase= await db.Phase.create(req.body)
            res.status(201).send(newPhase)
        } catch (error) {
            throw error
        }
    },
    remove: async (req,res)=>{
        try {
            const phaseDeleted= await db.Phase.destroy({
          where:{  id:req.params.id }
            })
            res.send(phaseDeleted)
        } catch (error) {
            throw error
        }
    }, 
    update: async function (req, res) {
        try {
          await db.Phase.update(req.body, {
            where: { id: req.params.id }
          });
      
          const updatedPhase = await db.Phase.findByPk(req.params.id);
      
          res.send(updatedPhase);
        } catch (error) {
          throw error;
        }
      },

}