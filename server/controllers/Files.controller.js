const sequalize =require('sequelize')
const {Files, Folder}= require('../models/index')

module.exports = {
    getAllFiles: async (req, res) => {
        try {
          const allEdges = await Folder.findOne({
            where : {id: req.params.id},
            include : [{
                model:Files
            }]
          });
          res.status(200).send(allEdges);
        } catch (error) {
          throw error;
        }
      },
      
      getfolderFiles : async (req,res) =>{
      try {
     const response = await  Files.findAll({where: {folderId: req.params.folderId}})
     res.json(response);
}     catch (error) {
    console.log(error);
}
      },
    
    addFile: async function (req, res) {
        try {
            const file = await Files.create(req.body)
            res.status(200).send(file)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteFile: async function (req, res) {
        try {
            const Files = await Files.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(Files)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    updateFile: async function (req, res) {
        try {
            const file = await Files.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(file)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },

}