const sequalize =require('sequelize')
const {User_Lawyer,User,Lawyer}= require('../models/index')


module.exports = {
getUserLawyerId:async (req,res)=>{
    try{
        const id= await User_Lawyer.findAll({where:{ userId: req.params.userId, lawyerId: req.params.lawyerId}})
        res.json(id)
    }catch(error){
        console.log(error);
        res.json(error)
    }
},


getClientsByLawyerId: async (req, res) => {
    try {
      const userLawyerRelations = await Lawyer.findAll({ where: { id: req.params.lawyerId },
        include: [{
        model: User,
        order: [['id', 'ASC']], 
       }],
      
    });
      res.json(userLawyerRelations);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
 add: async (req,res)=>{
    try {
        const newUser_Lawyer= await User_Lawyer.create(req.body)
        res.status(201).send(newUser_Lawyer)
    } catch (error) {
        throw error
    }
 },

}