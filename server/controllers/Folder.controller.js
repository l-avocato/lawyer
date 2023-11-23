const sequalize =require('sequelize')
const {Folder, Phase, File}= require('../models/index')

module.exports = {
    getAllFolder: async (req, res) => {
        try {
            const allFolder = await Phase.findOne({where:{id:req.params.id},
                include:[{
                  model:Folder,
                  order:[["createdAt","DESC"]],
          
              
                }]
              
              });
              res.send(allFolder).status(200)
        } catch (error) {
          throw error;
        }
      },
    getAllFolderbyName: async (req, res) => {
        try {
          const allFolder = await Folder.findAll({where:{name:req.params.name}});
          res.status(200).send(allFolder);
        } catch (error) {
          throw error;
        }
      },

    
    addFolder: async function (req, res) {
        try {
            const folder = await Folder.create(req.body)
            res.status(200).send(folder)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    deleteFolder: async function (req, res) {
        try {
            const folder = await Folder.destroy({
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(folder)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },
    updateFolder: async function (req, res) {
        try {
            const folder = await Folder.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send(folder)
        } catch (error) {
            res.status(500).send({
                error: error.message
            })
        }
    },

}