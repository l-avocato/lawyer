const sequalize =require('sequelize')
const {User_Lawyer}= require('../models/index')


module.exports = {


 add: async (req,res)=>{
    try {
        const newUser_Lawyer= await User_Lawyer.create(req.body)
        res.status(201).send(newUser_Lawyer)
    } catch (error) {
        throw error
    }
 },

}