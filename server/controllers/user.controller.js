const sequalize =require('sequelize')
const {db}= require('../models/index')


module.exports = {

getAllUsers : async () => {
    try {
        const allUsers= await db.User.findAll()
        res.status(200).send(allUsers)
    } catch (error) {
        throw error
    
    }
 },
 getUserId: async (req,res)=>{
  try {
      const oneUser= await db.User.findOne({
         where :{id: req.params.id }
      })
      res.status(200).send(oneUser)
  } catch (error) {
      throw error
  }
},

 add: async (req,res)=>{
    try {
        const newUser= await db.User.create(req.body)
        res.status(201).send(newUser)
    } catch (error) {
        throw error
    }
 },
delete: async (req,res)=>{
    try {
        const userDeleted= await db.User.destroy({
      where:{  id:req.params.id }
        })
        res.send(userDeleted)
    } catch (error) {
        throw error
    }
},
update: async function (req, res) {
    try {
      await db.User.update(req.body, {
        where: { id: req.params.id }
      });
  
      const updatedUser = await db.User.findByPk(req.params.id);
  
      res.send(updatedUser);
    } catch (error) {
      throw error;
    }
  },
  searchUser: async (req,res)=>{
    try {
        const searchUser= await db.User.findAll({
           where :{fullName: req.params.fullName }
        })
        res.status(200).send(searchUser)
    } catch (error) {
        throw error
    }
  },
  searchUserByCIN: async (req,res)=>{
    try {
        const searchUser= await db.User.findAll({
         where :{CIN: req.params.CIN }
        })
        res.status(200).send(searchUser)
    } catch (error) {
        throw error
    }
  },
  blockUser: async (req,res)=>{
    try {
        const blockUser= await db.User.update(
          {IsBlocked: true},{
            where :{id: req.params.id }
         })
        res.status(200).send(blockUser)
    } catch (error) {
        throw error
    }
  },



  



}
