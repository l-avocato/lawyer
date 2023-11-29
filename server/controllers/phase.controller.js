const sequalize = require("sequelize");
const { Phase,Case, Lawyer } = require("../models/index");

module.exports = {
  getAllPhases: async (req, res) => {
    try {

      const allPhases = await Case.findOne({where: {id: req.params.id},
        include:[{
        model:Phase

      }]});
      res.status(200).send(allPhases);
    } catch (error) {
      throw error;
    }
  },
    

 

  getPhaseId: async (req, res) => {
    try {
      const onePhase = await Phase.findOne({
        where: { id: req.params.id },
      });
      res.status(200).send(onePhase);
    } catch (error) {
      throw error;
    }
  },

  add: async (req, res) => {
    try {
      if(req.body.price){
        const result = await Phase.create({ IsPaid: false, ...req.body})
       return    res.status(200).send(result)
      }
      else {
       const result = await Phase.create(req.body) 
     return    res.status(200).send(result)
      }


 } catch (error) {
     res.status(500).send({
         error: error.message
     })
 }
  },
  remove: async (req, res) => {
    console.log(req.params.id)
    try {
      const phaseDeleted = await Phase.destroy({
        where: { id: req.params.id }
      });
      res.json(phaseDeleted);
    } catch (error) {
      throw error;
    }
  },
  update: async function (req, res) {
    try {
       if(req.body.price  ){
         const result = await Phase.update({ IsPaid: false, ...req.body}, {
   
             where: {
                 id: req.params.id
             }
         })
        
       return res.status(200).send(result)
       }
       else {
        const result = await Phase.update(req.body, {
          where: {
              id: req.params.id
          }
      }) 
      return    res.status(200).send(result)
       }


  } catch (error) {
      res.status(500).send({
          error: error.message
      })
  }
  },
  updatePhase: async (req,res)=>{
    try {
      await Phase.update(req.body, {
        where: { id: req.params.id }
      });
  
      const updatedPhase = await Phase.findByPk(req.params.id);
  
      res.send(updatedPhase);
    } catch (error) {
      throw error;
    }

  } ,
  getPhasesByLawyerId: async (req, res) => {
    try {
      const phases = await Phase.findAll({
        where: { lawyerId: req.params.id },
      });
      res.status(200).send(phases);
    } catch (error) {
      throw error;
    }
  }
}
