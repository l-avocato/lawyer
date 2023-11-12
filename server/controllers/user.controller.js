const sequalize =require('sequelize')
const {User}= require('../models/index')


module.exports = {

getAllUsers : async (req,res) => {
    try {
        const allUsers= await User.findAll()
        res.status(200).send(allUsers)
    } catch (error) {
        throw error
    
    }
 },
 getUserId: async (req,res)=>{
  try {
      const oneUser= await User.findOne({
         where :{id: req.params.id }
      })
      res.status(200).send(oneUser)
  } catch (error) {
      throw error
  }
},

 add: async (req,res)=>{
    try {
        const newUser= await User.create(req.body)
        res.status(201).send(newUser)
    } catch (error) {
        throw error
    }
 },
deleteUser: async (req,res)=>{
    try {
        const userDeleted= await User.destroy({
      where:{  id:req.params.id }
        })
        res.json(userDeleted)
    } catch (error) {
        throw error
    }
},
update: async function (req, res) {
    try {
      await User.update(req.body, {
        where: { id: req.params.id }
      });
  
      const updatedUser = await User.findByPk(req.params.id);
  
      res.send(updatedUser);
    } catch (error) {
      throw error;
    }
  },
  searchUser: async (req,res)=>{
    try {
        const searchUser= await User.findAll({
           where :{fullName: req.params.fullName }
        })
        res.status(200).send(searchUser)
    } catch (error) {
        throw error
    }
  },
  searchUserByCIN: async (req,res)=>{
    try {
        const searchUser= await User.findAll({
         where :{CIN: req.params.CIN }
        })
        res.status(200).send(searchUser)
    } catch (error) {
        throw error
    }
  },
  getUserByEmail: async (req,res)=>{
    try {
        const searchUser= await User.findAll({
         where :{email: req.params.email }
        })
        res.status(200).send(searchUser)
    } catch (error) {
        throw error
    }
  },
  blockUser: async (req,res)=>{
    try {
        const blockUser= await User.update(
          {IsBlocked: true},{
            where :{id: req.params.id }
         })
        res.status(200).send(blockUser)
    } catch (error) {
        throw error
    }
  },

}
